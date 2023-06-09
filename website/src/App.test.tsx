import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react'
import * as apiCacheModule from './Api/Cache'
import { App } from './App'
import { PageTypes } from './Types/PageTypes'

jest.mock('./Api/Cache')

const apiDataMockResponse = [
  {
    id: 'ai-tell-me-a-story',
    contents: '',
    title: 'Purchase my book AI, Tell Me a Story from these platforms.',
    hasWebsite: true,
    website: 'https://aitellmeastory.clydedsouza.net',
    excerpt: '',
  },
]

describe('App', () => {
  beforeEach(() => {
    jest.spyOn(apiCacheModule, 'getCachedProjectData').mockImplementation(() =>
      Promise.resolve({
        app: {},
        data: [apiDataMockResponse[0]],
      })
    )
  })

  it('should render app', async () => {
    render(<App />)
    await waitForElementToBeRemoved(() =>
      screen.queryAllByText('Contents are loading...')
    )
    expect(document.body).toMatchSnapshot()
  })

  it('should call the API endpoint thrice', async () => {
    render(<App />)
    await waitForElementToBeRemoved(() =>
      screen.queryAllByText('Contents are loading...')
    )
    expect(apiCacheModule.getCachedProjectData).toBeCalledTimes(3)
    expect(apiCacheModule.getCachedProjectData).toBeCalledWith(PageTypes.Cta)
    expect(apiCacheModule.getCachedProjectData).toBeCalledWith(PageTypes.Cta)
    expect(apiCacheModule.getCachedProjectData).toBeCalledWith(PageTypes.Pinned)
  })
})
