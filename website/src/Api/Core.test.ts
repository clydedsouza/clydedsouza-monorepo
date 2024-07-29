import { waitFor } from '@testing-library/react'
import axios from 'axios'
import { PageTypes } from '../Components/Navigation/PageTypes'
import { API_BASE_URL, getProjectData } from './Core'

const apiDataMockResponse = [
  {
    id: 'ai-tell-me-a-story',
    title: 'Purchase my book AI, Tell Me a Story from these platforms.',
    website: 'https://aitellmeastory.clydedsouza.net',
  },
]

jest.mock('axios')

const getAxios = jest.spyOn(axios, 'get')

describe('Core', () => {
  describe('given API returns a result', () => {
    beforeEach(() => {
      getAxios.mockImplementation(() =>
        Promise.resolve({
          data: {
            app: {},
            data: [...apiDataMockResponse],
          },
        })
      )
    })

    afterEach(() => {
      jest.resetAllMocks()
    })

    it('should call API once', async () => {
      await getProjectData(PageTypes.Portfolio)
      expect(getAxios).toBeCalledTimes(1)
    })

    it('should return project data', async () => {
      const projects = await getProjectData(PageTypes.Portfolio)
      await waitFor(() =>
        expect(projects.data).toMatchObject(apiDataMockResponse)
      )
    })

    it.each([
      PageTypes.Portfolio,
      PageTypes.Platforms,
      PageTypes.Cta,
      PageTypes.Highlights,
    ])(
      'should call correct API endpoint when page type is %s',
      async (pageType: PageTypes) => {
        await getProjectData(pageType)
        expect(getAxios).toBeCalledWith(
          `${API_BASE_URL}${pageType.toLowerCase()}.json`
        )
      }
    )
  })

  describe('given API returns an error', () => {
    beforeEach(() => {
      getAxios.mockImplementation(() =>
        Promise.reject('API endpoint unavailable')
      )
    })

    afterEach(() => {
      jest.resetAllMocks()
    })

    it('should call API once', async () => {
      await getProjectData(PageTypes.Portfolio).catch(() => undefined)
      expect(getAxios).toBeCalledTimes(1)
    })

    it('should return error message', async () => {
      let error = ''
      await getProjectData(PageTypes.Portfolio).catch((err) => {
        error = err.message
      })

      await waitFor(() => expect(error).toEqual('API error'))
    })
  })
})
