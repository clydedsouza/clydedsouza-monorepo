import ListLayout from '@/components/Layouts/ListLayoutWithTags'
import siteMetadata from '@/data/siteMetadata'
import { allBlogs } from 'contentlayer/generated'
import { POSTS_PAGE_TITLE } from 'lib/constants'
import { getPaginationVariables } from 'lib/pagination'
import { genPageMetadata } from 'lib/seo'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'

export const metadata = genPageMetadata({
  title: 'All Blog Posts',
  description: `Read all blog posts in ${siteMetadata.title}`,
})

export default async function BlogPage(props: { searchParams: Promise<{ page: string }> }) {
  const posts = allCoreContent(sortPosts(allBlogs))
  const { initialDisplayPosts, pagination } = getPaginationVariables(posts, 1)

  return (
    <ListLayout
      posts={posts}
      initialDisplayPosts={initialDisplayPosts}
      pagination={pagination}
      title={POSTS_PAGE_TITLE}
    />
  )
}
