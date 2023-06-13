import { emptyProject } from '../../TestHelpers/testHelper'
import { PageTypes } from '../Components/Navigation/PageTypes'
import { getCachedProjectData } from './Cache'
import * as cacheStorageModule from './CacheStorage'
import * as apiCoreModule from './Core'

jest.mock('./Core')
jest.mock('./CacheStorage')

const apiDataMockResponse = [
  {
    ...emptyProject,
    id: 'ai-tell-me-a-story',
    title: 'Purchase my book AI, Tell Me a Story from these platforms.',
    website: 'https://aitellmeastory.clydedsouza.net',
  },
]

describe('Cache', () => {
  describe('given core api returns a result', () => {
    beforeEach(() => {
      jest.spyOn(apiCoreModule, 'getProjectData').mockImplementation(() =>
        Promise.resolve({
          app: {},
          data: [apiDataMockResponse[0]],
        })
      )
    })

    it('should return api data', async () => {
      jest
        .spyOn(cacheStorageModule.projectDataCacheMap, 'set')
        .mockImplementation(jest.fn())
      jest
        .spyOn(cacheStorageModule.projectDataCacheMap, 'has')
        .mockImplementation(() => {
          return false
        })
      jest
        .spyOn(cacheStorageModule.projectDataCacheMap, 'get')
        .mockImplementation(() => {
          return {
            app: {},
            data: [apiDataMockResponse[0]],
          }
        })

      const projects = await getCachedProjectData(PageTypes.Portfolio)

      expect(projects.data).toHaveLength(1)
    })

    it('should call core api once', async () => {
      jest
        .spyOn(cacheStorageModule.projectDataCacheMap, 'set')
        .mockImplementation(jest.fn())
      jest
        .spyOn(cacheStorageModule.projectDataCacheMap, 'has')
        .mockImplementation(() => {
          return false
        })
      jest
        .spyOn(cacheStorageModule.projectDataCacheMap, 'get')
        .mockImplementation(() => {
          return {
            app: {},
            data: [apiDataMockResponse[0]],
          }
        })

      await getCachedProjectData(PageTypes.Portfolio)

      expect(apiCoreModule.getProjectData).toBeCalledTimes(1)
    })

    it('should call the cache map methods correctly', async () => {
      const mapSet = jest
        .spyOn(cacheStorageModule.projectDataCacheMap, 'set')
        .mockImplementation(jest.fn())
      const mapHas = jest
        .spyOn(cacheStorageModule.projectDataCacheMap, 'has')
        .mockImplementation(() => {
          return false
        })
      const mapGet = jest
        .spyOn(cacheStorageModule.projectDataCacheMap, 'get')
        .mockImplementation(() => {
          return {
            app: {},
            data: [apiDataMockResponse[0]],
          }
        })

      const projects = await getCachedProjectData(PageTypes.Portfolio)

      expect(mapHas).toBeCalledTimes(1)
      expect(mapSet).toBeCalledTimes(1)
      expect(mapGet).toBeCalledTimes(1)
      expect(projects.data).toHaveLength(1)
    })

    it('should call core api once even when two requests of same page type are made', async () => {
      const mapSet = jest
        .spyOn(cacheStorageModule.projectDataCacheMap, 'set')
        .mockImplementation(jest.fn())
      const mapHas = jest
        .spyOn(cacheStorageModule.projectDataCacheMap, 'has')
        .mockImplementationOnce(() => {
          return false
        })
        .mockImplementationOnce(() => {
          return true
        })
      const mapGet = jest
        .spyOn(cacheStorageModule.projectDataCacheMap, 'get')
        .mockImplementation(() => {
          return {
            app: {},
            data: [apiDataMockResponse[0]],
          }
        })

      await getCachedProjectData(PageTypes.Portfolio)
      await getCachedProjectData(PageTypes.Portfolio)

      expect(apiCoreModule.getProjectData).toBeCalledTimes(1)
      expect(mapHas).toBeCalledTimes(2)
      expect(mapSet).toBeCalledTimes(1)
      expect(mapGet).toBeCalledTimes(2)
    })

    it('should call core api twice even when two requests of different page type are made', async () => {
      const mapSet = jest
        .spyOn(cacheStorageModule.projectDataCacheMap, 'set')
        .mockImplementation(jest.fn())
      const mapHas = jest
        .spyOn(cacheStorageModule.projectDataCacheMap, 'has')
        .mockImplementation(() => {
          return false
        })
      const mapGet = jest
        .spyOn(cacheStorageModule.projectDataCacheMap, 'get')
        .mockImplementation(() => {
          return {
            app: {},
            data: [apiDataMockResponse[0]],
          }
        })

      await getCachedProjectData(PageTypes.Portfolio)
      await getCachedProjectData(PageTypes.Platforms)

      expect(apiCoreModule.getProjectData).toBeCalledTimes(2)
      expect(mapHas).toBeCalledTimes(2)
      expect(mapSet).toBeCalledTimes(2)
      expect(mapGet).toBeCalledTimes(2)
    })
  })

  describe('given core api returns an error', () => {
    beforeEach(() => {
      jest
        .spyOn(apiCoreModule, 'getProjectData')
        .mockImplementation(() => Promise.reject('Error'))
    })

    it('should call the cache map methods correctly', async () => {
      const mapSet = jest
        .spyOn(cacheStorageModule.projectDataCacheMap, 'set')
        .mockImplementation(jest.fn())
      const mapHas = jest
        .spyOn(cacheStorageModule.projectDataCacheMap, 'has')
        .mockImplementation(() => {
          return false
        })
      const mapGet = jest
        .spyOn(cacheStorageModule.projectDataCacheMap, 'get')
        .mockImplementation(() => {
          return {
            app: {},
            data: [],
          }
        })
      const mapDelete = jest
        .spyOn(cacheStorageModule.projectDataCacheMap, 'delete')
        .mockImplementation(() => {
          return true
        })

      await getCachedProjectData(PageTypes.Portfolio).catch(() => undefined)

      expect(mapHas).toBeCalledTimes(1)
      expect(mapDelete).toBeCalledTimes(1)
      expect(mapSet).toBeCalledTimes(0)
      expect(mapGet).toBeCalledTimes(0)
      //expect(projects.data).toHaveLength(1)
    })
  })
})
