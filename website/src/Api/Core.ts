import axios from 'axios'
import { PageTypes } from '../Types/PageTypes'
import { IProjectData } from '../Types/ProjectData'

const BASE_URL = 'https://api.clydedsouza.net/'

const getProjectApiUrl = (pageType: PageTypes) => {
  switch (pageType) {
    case PageTypes.Books:
      return `${BASE_URL}books.json`
    case PageTypes.Speaking:
      return `${BASE_URL}speaking.json`
    case PageTypes.Teaching:
      return `${BASE_URL}teaching.json`
    case PageTypes.Highlights:
      return `${BASE_URL}highlights.json`
    case PageTypes.Pinned:
      return `${BASE_URL}pinned.json`
    case PageTypes.Projects:
    default:
      return `${BASE_URL}projects.json`
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
