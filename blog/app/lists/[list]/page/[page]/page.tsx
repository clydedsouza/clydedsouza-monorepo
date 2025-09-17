import ListLayout from '@/components/Layouts/ListLayoutWithTags'
import siteMetadata from '@/data/siteMetadata'
import tagData from 'app/data/static/tags.json'
import { allBlogs } from 'contentlayer/generated'
import { slug } from 'github-slugger'
import { POSTS_PER_PAGE } from 'lib/constants'
import { getPaginationVariables } from 'lib/pagination'
import { genPageMetadata } from 'lib/seo'
import { getListNameFromSlug } from 'lib/staticDataUtils'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'

export async function generateMetadata(props: {
  params: Promise<{ list: string; page: string }>
}): Promise<Metadata> {
  const params = await props.params
  const page = params.page
  const listNameInSlugFormat = decodeURI(params.list)
  const listName = getListNameFromSlug(listNameInSlugFormat)
  return genPageMetadata({
    title: `${listName} | Page ${page} | Reading List`,
    description: `${listName} reading list in ${siteMetadata.title}`,
    alternates: {
      canonical: './',
      types: {
        'application/rss+xml': `${siteMetadata.siteUrl}/lists/${listNameInSlugFormat}/feed.xml`,
      },
    },
  })
}

export const generateStaticParams = async () => {
  const tagCounts = tagData as Record<string, number>
  return Object.keys(tagCounts).flatMap((tag) => {
    const postCount = tagCounts[tag]
    const totalPages = Math.max(1, Math.ceil(postCount / POSTS_PER_PAGE))
    return Array.from({ length: totalPages }, (_, i) => ({
      list: encodeURI(tag),
      page: (i + 1).toString(),
    }))
  })
}

export default async function ListPage(props: { params: Promise<{ list: string; page: string }> }) {
  const params = await props.params
  const listNameInSlugFormat = decodeURI(params.list)
  const pageNumber = parseInt(params.page)
  const postsWithTag = allCoreContent(
    sortPosts(
      allBlogs.filter(
        (post) =>
          post.readingList && post.readingList.map((t) => slug(t)).includes(listNameInSlugFormat)
      )
    )
  )

  const { initialDisplayPosts, pagination, totalPages } = getPaginationVariables(
    postsWithTag,
    pageNumber
  )

  if (
    pageNumber <= 0 ||
    pageNumber > totalPages ||
    isNaN(pageNumber) ||
    !postsWithTag ||
    postsWithTag.length < 1
  ) {
    return notFound()
  }

  const listName = getListNameFromSlug(listNameInSlugFormat)

  return (
    <ListLayout
      posts={postsWithTag}
      initialDisplayPosts={initialDisplayPosts}
      pagination={pagination}
      title={listName}
      sidebarType="LISTS"
    />
  )
}
