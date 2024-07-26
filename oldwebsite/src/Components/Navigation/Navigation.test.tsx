import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react'
import * as apiCacheModule from '../../Api/Cache'
import Navigation from './Navigation'
import { PageTypes } from './PageTypes'

jest.mock('../../Api/Cache')

describe('Navigation', () => {
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

  it('should render navigation', async () => {
    render(<Navigation />)
    await waitForElementToBeRemoved(() => screen.queryByRole('progressbar'))
    expect(document.body).toMatchSnapshot()
  })

  it('should call API with correct page type', async () => {
    render(<Navigation />)
    await waitForElementToBeRemoved(() => screen.queryByRole('progressbar'))
    expect(apiCacheModule.getCachedProjectData).toBeCalledTimes(1)
    expect(apiCacheModule.getCachedProjectData).toBeCalledWith(
      PageTypes.Highlights
    )
  })
})
