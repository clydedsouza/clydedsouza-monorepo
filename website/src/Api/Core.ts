import axios from 'axios'
import { PageTypes } from '../Components/Navigation/PageTypes'
import { IProjectData } from './IProjectData'

const BASE_URL = 'https://api.clydedsouza.net/'

const getProjectApiUrl = (pageType: PageTypes) => {
  switch (pageType) {
    case PageTypes.Cta:
      return `${BASE_URL}cta.json`
    case PageTypes.Highlights:
      return `${BASE_URL}highlights.json`
    case PageTypes.Platforms:
      return `${BASE_URL}platforms.json`
    case PageTypes.Portfolio:
    default:
      return `${BASE_URL}portfolio.json`
  }
}

export const getProjectData = async (
  pageType: PageTypes
): Promise<IProjectData> => {
  const request = getProjectApiUrl(pageType)
  return axios
    .get(request)
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      throw new Error('API error', error)
    })
}
