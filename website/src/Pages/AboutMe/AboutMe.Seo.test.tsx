import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react'
import * as apiCacheModule from '../../Api/Cache'
import AboutMe from './AboutMe'

jest.mock('../../Api/Cache')

describe('About me', () => {
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

  it('should render seo', async () => {
    render(<AboutMe />)
    await waitForElementToBeRemoved(() =>
      screen.queryByText('Contents are loading...')
    )
    await waitFor(() =>
      expect(document.title).toEqual(
        `Clyde D'Souza – Software Engineer and Author`
      )
    )
    expect(document.head).toMatchSnapshot()
  })
})
