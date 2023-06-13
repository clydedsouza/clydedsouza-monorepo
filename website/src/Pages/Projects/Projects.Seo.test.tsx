import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react'
import * as apiCacheModule from '../../Api/Cache'
import { PageTypes } from '../../Components/Navigation/PageTypes'
import Projects from './Projects'

jest.mock('../../Api/Cache')

describe('Projects', () => {
  beforeEach(() => {
    jest
      .spyOn(apiCacheModule, 'getCachedProjectData')
      .mockImplementationOnce(() =>
        Promise.resolve({
          app: {},
          data: [],
        })
      )
  })

  describe.each([PageTypes.Portfolio, PageTypes.Platforms])(
    'given page type is %s',
    (pageType: PageTypes) => {
      it(`should render projects seo`, async () => {
        render(<Projects {...{ name: pageType }} />)
        await waitForElementToBeRemoved(() => screen.queryByRole('progressbar'))
        await waitFor(() =>
          expect(document.title).toEqual(
            `${pageType} – Clyde D'Souza – Software Engineer and Author`
          )
        )
        expect(document.head).toMatchSnapshot()
      })
    }
  )
})
