import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react'
import * as apiCacheModule from '../../Api/Cache'
import { PageTypes } from '../../Components/Navigation/PageTypes'
import Platforms from './Platforms'

jest.mock('../../Api/Cache')

describe('Platforms', () => {
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

  it('should render platforms seo', async () => {
    render(<Platforms />)
    await waitForElementToBeRemoved(() => screen.queryByRole('progressbar'))
    await waitFor(() =>
      expect(document.title).toEqual(
        `${PageTypes.Platforms} – Clyde D'Souza – Software Engineer and Author`
      )
    )
    expect(document.head).toMatchSnapshot()
  })
})
