import { waitFor } from '@testing-library/react'
import axios from 'axios'
import { PageTypes } from '../Types/PageTypes'
import { getProjectData } from './Core'

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

jest.mock('axios')

const getAxios = jest.spyOn(axios, 'get')

describe('Core', () => {
  describe('given api returns a result', () => {
    beforeEach(() => {
      getAxios.mockImplementation(() =>
        Promise.resolve({
          data: {
            app: {},
            data: apiDataMockResponse,
          },
        })
      )
    })

    afterEach(() => {
      jest.resetAllMocks()
    })

    it('should call api once', async () => {
      await getProjectData(PageTypes.Highlights)
      expect(getAxios).toBeCalledTimes(1)
    })

    it('should return project data', async () => {
      const projects = await getProjectData(PageTypes.Highlights)
      await waitFor(() =>
        expect(projects.data).toMatchObject(apiDataMockResponse)
      )
    })

    it.each([
      PageTypes.Highlights,
      PageTypes.Platforms,
      PageTypes.Cta,
      PageTypes.Pinned,
    ])(
      'should call correct api endpoint when page type is %s',
      async (pageType: PageTypes) => {
        await getProjectData(pageType)
        expect(getAxios).toBeCalledWith(
          `https://api.clydedsouza.net/${pageType.toLowerCase()}.json`
        )
      }
    )
  })

  describe('given api returns an error', () => {
    beforeEach(() => {
      getAxios.mockImplementation(() =>
        Promise.reject('API endpoint unavailable')
      )
    })

    afterEach(() => {
      jest.resetAllMocks()
    })

    it('should call api once', async () => {
      await getProjectData(PageTypes.Highlights).catch(() => undefined)
      expect(getAxios).toBeCalledTimes(1)
    })

    it('should return error message', async () => {
      let error = ''
      await getProjectData(PageTypes.Highlights).catch((err) => {
        error = err.message
      })

      await waitFor(() => expect(error).toEqual('API error'))
    })
  })
})