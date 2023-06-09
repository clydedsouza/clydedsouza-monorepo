import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react'
import * as apiCacheModule from '../../Api/Cache'
import Mainstage from './Mainstage'

jest.mock('../../Api/Cache')

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

describe('Mainstage', () => {
  beforeEach(() => {
    jest.spyOn(apiCacheModule, 'getCachedProjectData').mockImplementation(() =>
      Promise.resolve({
        app: {},
        data: [apiDataMockResponse[0]],
      })
    )
  })

  it('should render mainstage', async () => {
    render(<Mainstage />)
    await waitForElementToBeRemoved(() =>
      screen.queryAllByText('Contents are loading...')
    )
    expect(document.body).toMatchSnapshot()
  })
})
