import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react'
import { emptyProject } from '../TestHelpers/testHelper'
import * as apiCacheModule from './Api/Cache'
import { App } from './App'
import { PageTypes } from './Components/Navigation/PageTypes'
jest.mock('./Api/Cache')

const apiDataMockResponse = [
  {
    ...emptyProject,
    id: 'ai-tell-me-a-story',
    title: 'Purchase my book AI, Tell Me a Story from these platforms.',
    website: 'https://aitellmeastory.clydedsouza.net',
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
    await waitForElementToBeRemoved(() => screen.queryAllByRole('progressbar'))
    expect(document.body).toMatchSnapshot()
  })

  it('should call the API endpoint thrice', async () => {
    render(<App />)
    await waitForElementToBeRemoved(() => screen.queryAllByRole('progressbar'))
    expect(apiCacheModule.getCachedProjectData).toBeCalledTimes(3)
    expect(apiCacheModule.getCachedProjectData).toBeCalledWith(PageTypes.Cta)
    expect(apiCacheModule.getCachedProjectData).toBeCalledWith(PageTypes.Cta)
    expect(apiCacheModule.getCachedProjectData).toBeCalledWith(
      PageTypes.Highlights
    )
  })
})
