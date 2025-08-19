import ListLayout from '@/components/Layouts/ListLayoutWithTags'
import { allBlogs } from 'contentlayer/generated'
import { POSTS_PAGE_TITLE, POSTS_PER_PAGE } from 'lib/constants'
import { getPaginationVariables } from 'lib/pagination'
import { notFound } from 'next/navigation'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'

export const generateStaticParams = async () => {
  const totalPages = Math.ceil(allBlogs.length / POSTS_PER_PAGE)
  const paths = Array.from({ length: totalPages }, (_, i) => ({ page: (i + 1).toString() }))

  return paths
}

export default async function Page(props: { params: Promise<{ page: string }> }) {
  const posts = allCoreContent(sortPosts(allBlogs))
  const params = await props.params
  const pageNumber = parseInt(params.page as string)
  const { initialDisplayPosts, pagination, totalPages } = getPaginationVariables(posts, pageNumber)

  if (pageNumber <= 0 || pageNumber > totalPages || isNaN(pageNumber)) {
    return notFound()
  }

  return (
    <ListLayout
      posts={posts}
      initialDisplayPosts={initialDisplayPosts}
      pagination={pagination}
      title={POSTS_PAGE_TITLE}
    />
  )
}
