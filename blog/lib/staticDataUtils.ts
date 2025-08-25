import readingListData from '@/app/data/static/readingList.json'
import tagData from '@/app/data/static/tags.json'
import { slug } from 'github-slugger'

export const getListNameFromSlug = (listNameInSlugFormat: string) => {
  return (
    Object.keys(readingListData).find((item) => slug(item) === listNameInSlugFormat) ??
    listNameInSlugFormat
  )
}

export const getTagNameFromSlug = (tagNameInSlugFormat: string) => {
  return (
    Object.keys(tagData).find((item) => slug(item) === tagNameInSlugFormat) ?? tagNameInSlugFormat
  )
}
