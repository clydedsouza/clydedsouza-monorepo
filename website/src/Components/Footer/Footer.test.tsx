import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react'
import * as apiCacheModule from '../../Api/Cache'
import Footer from './Footer'

jest.mock('../../Api/Cache')

const ctaDataMockResponse = [
  {
    id: 'ai-tell-me-a-story',
    contents: '',
    title: 'Purchase my book AI, Tell Me a Story from these platforms.',
    hasWebsite: true,
    website: 'https://aitellmeastory.clydedsouza.net',
    excerpt: '',
  },
]

describe('Footer', () => {
  beforeEach(() => {
    jest
      .spyOn(apiCacheModule, 'getCachedProjectData')
      .mockImplementationOnce(() =>
        Promise.resolve({
          app: {},
          data: [ctaDataMockResponse[0]],
        })
      )
  })

  it('should render footer', async () => {
    render(<Footer />)
    await waitForElementToBeRemoved(() =>
      screen.queryByText('Contents are loading...')
    )
    expect(document.body).toMatchSnapshot()
  })
})
