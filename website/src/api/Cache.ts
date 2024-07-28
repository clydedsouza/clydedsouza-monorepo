import { projectDataCacheMap } from "@/api/CacheStorage";
import { getProjectData } from "@/api/Core";
import { IProjectData } from "@/api/IProjectData";
import { PageTypes } from "@/blocks/Navigation/PageTypes";

export const getCachedProjectData = async (
  pageType: PageTypes
): Promise<IProjectData> => {
  if (!projectDataCacheMap.has(pageType)) {
    const getProjectDataResponse = await getProjectData(pageType).catch(
      (error) => {
        projectDataCacheMap.delete(pageType);
        return Promise.reject(error);
      }
    );
    projectDataCacheMap.set(pageType, getProjectDataResponse);
  }

  return (
    projectDataCacheMap.get(pageType) || Promise.resolve({ app: {}, data: [] })
  );
};
