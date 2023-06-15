import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react'
import { emptyProject } from '../../../TestHelpers/testHelper'
import * as apiCacheModule from '../../Api/Cache'
import Portfolio from './Portfolio'

jest.mock('../../Api/Cache')

const portfolioDataMockResponse = [
  {
    ...emptyProject,
    id: '20230105-amazing-alloy',
    title: 'Amazing alloy',
    date: '01 May 2020',
  },
  {
    ...emptyProject,
    id: '20170107-zinger-zebra',
    title: 'Zinger zebra',
    date: '01 Jul 2017',
  },
  {
    ...emptyProject,
    id: '20200330-madness-monkey',
    title: 'Madness monkey',
    date: '30 March 2023',
  },
]

describe('Portfolio', () => {
  beforeEach(() => {
    jest
      .spyOn(apiCacheModule, 'getCachedProjectData')
      .mockImplementationOnce(() =>
        Promise.resolve({
          app: {},
          data: [...portfolioDataMockResponse],
        })
      )
  })

  it('should render portfolio page', async () => {
    render(<Portfolio />)
    await waitForElementToBeRemoved(() => screen.queryByRole('progressbar'))
    expect(document.body).toMatchSnapshot()
  })

  it('should sort portfolio in desc order of its date', async () => {
    render(<Portfolio />)
    await waitForElementToBeRemoved(() => screen.queryByRole('progressbar'))
    const portfolioHeadings = screen.getAllByRole('heading')
    expect(portfolioHeadings[0]).toHaveTextContent(
      portfolioDataMockResponse[2].title
    )
    expect(portfolioHeadings[1]).toHaveTextContent(
      portfolioDataMockResponse[0].title
    )
    expect(portfolioHeadings[2]).toHaveTextContent(
      portfolioDataMockResponse[1].title
    )
  })
})
