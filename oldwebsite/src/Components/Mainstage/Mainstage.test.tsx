import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react'
import { emptyProject } from '../../../TestHelpers/testHelper'
import * as apiCacheModule from '../../Api/Cache'
import Mainstage from './Mainstage'

jest.mock('../../Api/Cache')

const apiDataMockResponse = [
  {
    ...emptyProject,
    id: 'ai-tell-me-a-story',
    title: 'Purchase my book AI, Tell Me a Story from these platforms.',
    website: 'https://aitellmeastory.clydedsouza.net',
  },
]

describe('Mainstage', () => {
  beforeEach(() => {
    jest.spyOn(apiCacheModule, 'getCachedProjectData').mockImplementation(() =>
      Promise.resolve({
        app: {},
        data: [...apiDataMockResponse],
      })
    )
  })

  it('should render mainstage', async () => {
    render(<Mainstage />)
    await waitForElementToBeRemoved(() => screen.queryAllByRole('progressbar'))
    expect(document.body).toMatchSnapshot()
  })
})
