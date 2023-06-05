import axios from 'axios'
import { PageTypes } from '../Types/PageTypes'
import { IProjectData } from '../Types/ProjectData'

const BASE_URL = 'https://api.clydedsouza.net/'

const getProjectApiUrl = (pageType: PageTypes) => {
  switch (pageType) {
    case PageTypes.Cta:
      return `${BASE_URL}cta.json`
    case PageTypes.Pinned:
      return `${BASE_URL}pinned.json`
    case PageTypes.Platforms:
      return `${BASE_URL}platforms.json`
    case PageTypes.Highlights:
    default:
      return `${BASE_URL}highlights.json`
  }
}

export const getProjectData = (pageType: PageTypes): Promise<IProjectData> => {
  const request = getProjectApiUrl(pageType)
  return axios
    .get(request)
    .then((response) => {
      return response.data
    })
    .catch(() => {
      throw new Error('API error')
    })
}
