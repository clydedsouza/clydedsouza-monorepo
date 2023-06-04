import { PageTypes } from '../Types/PageTypes'
import { IProjectData } from '../Types/ProjectData'
import { getProjectData } from './Core'

const projectDataCacheMap: Map<PageTypes, Promise<IProjectData>> = new Map()

export const getCachedProjectData = (
  pageType: PageTypes
): Promise<IProjectData> => {
  if (!projectDataCacheMap.has(pageType)) {
    const getProjectDataPromise = getProjectData(pageType).catch((error) => {
      projectDataCacheMap.delete(pageType)
      return Promise.reject(error)
    })
    projectDataCacheMap.set(pageType, getProjectDataPromise)
  }

  return projectDataCacheMap.get(pageType)!
}
