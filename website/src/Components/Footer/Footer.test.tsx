import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react'
import { emptyProject } from '../../../TestHelpers/testHelper'
import * as apiCacheModule from '../../Api/Cache'
import Footer from './Footer'

jest.mock('../../Api/Cache')

const ctaDataMockResponse = [
  {
    ...emptyProject,
    id: 'ai-tell-me-a-story',
    title: 'Purchase my book AI, Tell Me a Story from these platforms.',
    website: 'https://aitellmeastory.clydedsouza.net',
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
    await waitForElementToBeRemoved(() => screen.queryByRole('progressbar'))
    expect(document.body).toMatchSnapshot()
  })
})
