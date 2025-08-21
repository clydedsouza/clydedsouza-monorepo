import ListLayout from '@/components/Layouts/ListLayoutWithTags'
import tagData from 'app/data/static/tags.json'
import { allBlogs } from 'contentlayer/generated'
import { slug } from 'github-slugger'
import { getTagPageTitle, POSTS_PER_PAGE } from 'lib/constants'
import { getPaginationVariables } from 'lib/pagination'
import { notFound } from 'next/navigation'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'

export const generateStaticParams = async () => {
  const tagCounts = tagData as Record<string, number>
  return Object.keys(tagCounts).flatMap((tag) => {
    const postCount = tagCounts[tag]
    const totalPages = Math.max(1, Math.ceil(postCount / POSTS_PER_PAGE))
    return Array.from({ length: totalPages }, (_, i) => ({
      tag: encodeURI(tag),
      page: (i + 1).toString(),
    }))
  })
}

export default async function TagPage(props: { params: Promise<{ tag: string; page: string }> }) {
  const params = await props.params
  const tag = decodeURI(params.tag)
  const pageNumber = parseInt(params.page)
  const postsWithTag = allCoreContent(
    sortPosts(allBlogs.filter((post) => post.tags && post.tags.map((t) => slug(t)).includes(tag)))
  )

  const { initialDisplayPosts, pagination, totalPages } = getPaginationVariables(
    postsWithTag,
    pageNumber
  )

  if (pageNumber <= 0 || pageNumber > totalPages || isNaN(pageNumber)) {
    return notFound()
  }

  return (
    <ListLayout
      posts={postsWithTag}
      initialDisplayPosts={initialDisplayPosts}
      pagination={pagination}
      title={getTagPageTitle(tag)}
      sidebarType="LISTS"
    />
  )
}
