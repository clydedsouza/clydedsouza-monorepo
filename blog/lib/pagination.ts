import { Blog } from 'contentlayer/generated'
import { CoreContent } from 'pliny/utils/contentlayer'
import { POSTS_PER_PAGE } from './constants'

export const getPaginationVariables = (posts: CoreContent<Blog>[], pageNumber: number) => {
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE)
  const initialDisplayPosts =
    pageNumber === 1
      ? posts.slice(0, POSTS_PER_PAGE * pageNumber)
      : posts.slice(POSTS_PER_PAGE * (pageNumber - 1), POSTS_PER_PAGE * pageNumber)
  const pagination = {
    currentPage: pageNumber,
    totalPages: totalPages,
  }
  return { initialDisplayPosts, pagination, totalPages }
}
