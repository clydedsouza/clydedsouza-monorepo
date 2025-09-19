import ListLayout from '@/components/Layouts/ListLayoutWithTags'
import siteMetadata from '@/data/siteMetadata'
import staticReadingListData from 'app/data/static/readingList.json'
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
  const readingListInSlugFormat = slug(params.list)
  const readingListName = getListNameFromSlug(readingListInSlugFormat)
  return genPageMetadata({
    title: `${readingListName} | Page ${page} | Reading List`,
    description: `${readingListName} reading list in ${siteMetadata.title}`,
    alternates: {
      canonical: './',
      types: {
        'application/rss+xml': `${siteMetadata.siteUrl}/lists/${readingListInSlugFormat}/feed.xml`,
      },
    },
  })
}

export const generateStaticParams = async () => {
  const allReadingListsWithCount = staticReadingListData as Record<string, number>
  return Object.keys(allReadingListsWithCount).flatMap((readingList) => {
    const readingListCount = allReadingListsWithCount[readingList]
    const totalPages = Math.max(1, Math.ceil(readingListCount / POSTS_PER_PAGE))
    return Array.from({ length: totalPages }, (_, i) => ({
      list: slug(readingList),
      page: (i + 1).toString(),
    }))
  })
}

export default async function ListPage(props: { params: Promise<{ list: string; page: string }> }) {
  const params = await props.params
  const pageNumber = parseInt(params.page)
  const readingListInSlugFormat = slug(params.list)
  const postsInReadingList = allCoreContent(
    sortPosts(
      allBlogs.filter(
        (post) =>
          post.readingList && post.readingList.map((t) => slug(t)).includes(readingListInSlugFormat)
      )
    )
  )

  const { initialDisplayPosts, pagination, totalPages } = getPaginationVariables(
    postsInReadingList,
    pageNumber
  )

  if (
    pageNumber <= 0 ||
    pageNumber > totalPages ||
    isNaN(pageNumber) ||
    !postsInReadingList ||
    postsInReadingList.length < 1
  ) {
    return notFound()
  }

  const readingListName = getListNameFromSlug(readingListInSlugFormat)

  return (
    <ListLayout
      posts={postsInReadingList}
      initialDisplayPosts={initialDisplayPosts}
      pagination={pagination}
      title={readingListName}
      sidebarType="LISTS"
    />
  )
}
