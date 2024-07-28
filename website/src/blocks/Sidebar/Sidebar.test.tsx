import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react'
import { emptyProject } from '../../../TestHelpers/testHelper'
import * as apiCacheModule from '../../Api/Cache'
import Sidebar from './Sidebar'

jest.mock('../../Api/Cache')

const ctaDataMockResponse = [
  {
    ...emptyProject,
    id: 'ai-tell-me-a-story',
    title: 'Purchase my book AI, Tell Me a Story from these platforms.',
    website: 'https://aitellmeastory.clydedsouza.net',
  },
]

describe('Sidebar', () => {
  beforeEach(() => {
    jest
      .spyOn(apiCacheModule, 'getCachedProjectData')
      .mockImplementationOnce(() =>
        Promise.resolve({
          app: {},
          data: [...ctaDataMockResponse],
        })
      )
  })

  it('should render sidebar', async () => {
    render(<Sidebar />)
    await waitForElementToBeRemoved(() => screen.queryByRole('progressbar'))
    expect(document.body).toMatchSnapshot()
  })
})
