import { PageTypes } from '../Components/Navigation/PageTypes'
import { projectDataCacheMap } from './CacheStorage'
import { getProjectData } from './Core'
import { IProjectData } from './IProjectData'

export const getCachedProjectData = async (
  pageType: PageTypes
): Promise<IProjectData> => {
  if (!projectDataCacheMap.has(pageType)) {
    const getProjectDataResponse = await getProjectData(pageType).catch(
      (error) => {
        projectDataCacheMap.delete(pageType)
        return Promise.reject(error)
      }
    )
    projectDataCacheMap.set(pageType, getProjectDataResponse)
  }

  return (
    projectDataCacheMap.get(pageType) || Promise.resolve({ app: {}, data: [] })
  )
}
