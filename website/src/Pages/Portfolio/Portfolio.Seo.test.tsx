import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react'
import * as apiCacheModule from '../../Api/Cache'
import { PageTypes } from '../../Components/Navigation/PageTypes'
import Portfolio from './Portfolio'

jest.mock('../../Api/Cache')

describe('Portfolio', () => {
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

  it('should render portfolio seo', async () => {
    render(<Portfolio />)
    await waitForElementToBeRemoved(() => screen.queryByRole('progressbar'))
    await waitFor(() =>
      expect(document.title).toEqual(
        `${PageTypes.Portfolio} – Clyde D'Souza – Software Engineer and Author`
      )
    )
    expect(document.head).toMatchSnapshot()
  })
})
