import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react'
import { emptyProject } from '../../../TestHelpers/testHelper'
import * as apiCacheModule from '../../Api/Cache'
import Platforms from './Platforms'

jest.mock('../../Api/Cache')

const platformsDataMockResponse = [
  {
    ...emptyProject,
    id: '123-amazing-alloy',
    title: 'Amazing alloy',
    date: '01 May 2020',
  },
  {
    ...emptyProject,
    id: '012-zinger-zebra',
    title: 'Zinger zebra',
    date: '01 Jul 2017',
  },
  {
    ...emptyProject,
    id: '020-madness-monkey',
    title: 'Madness monkey',
    date: '30 March 2023',
  },
]

describe('Platforms', () => {
  beforeEach(() => {
    jest
      .spyOn(apiCacheModule, 'getCachedProjectData')
      .mockImplementationOnce(() =>
        Promise.resolve({
          app: {},
          data: [...platformsDataMockResponse],
        })
      )
  })

  it('should render platforms page', async () => {
    render(<Platforms />)
    await waitForElementToBeRemoved(() => screen.queryByRole('progressbar'))
    expect(document.body).toMatchSnapshot()
  })

  it('should sort platforms in asc order of its id', async () => {
    render(<Platforms />)
    await waitForElementToBeRemoved(() => screen.queryByRole('progressbar'))
    const platformHeadings = screen.getAllByRole('heading')
    expect(platformHeadings[0]).toHaveTextContent(
      platformsDataMockResponse[1].title
    )
    expect(platformHeadings[1]).toHaveTextContent(
      platformsDataMockResponse[2].title
    )
    expect(platformHeadings[2]).toHaveTextContent(
      platformsDataMockResponse[0].title
    )
  })
})
