import ListLayout from '@/components/Layouts/ListLayoutWithTags'
import siteMetadata from '@/data/siteMetadata'
import staticReadingListData from 'app/data/static/readingList.json'
import { allBlogs } from 'contentlayer/generated'
import { slug } from 'github-slugger'
import { getPaginationVariables } from 'lib/pagination'
import { genPageMetadata } from 'lib/seo'
import { getListNameFromSlug } from 'lib/staticDataUtils'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'

export async function generateMetadata(props: {
  params: Promise<{ list: string }>
}): Promise<Metadata> {
  const params = await props.params
  const readingListInSlugFormat = slug(params.list)
  const readingListName = getListNameFromSlug(readingListInSlugFormat)
  return genPageMetadata({
    title: `${readingListName} | Reading List`,
    description: `Article in reading list ${readingListName} in ${siteMetadata.title}`,
    alternates: {
      canonical: './',
      types: {
        'application/rss+xml': `${siteMetadata.siteUrl}/tags/${readingListInSlugFormat}/feed.xml`,
      },
    },
  })
}

export const generateStaticParams = async () => {
  const allReadingListsWithCount = staticReadingListData as Record<string, number>
  return Object.keys(allReadingListsWithCount).map((readingList) => ({
    list: slug(readingList),
  }))
}

export default async function ReadingListPage(props: { params: Promise<{ list: string }> }) {
  const params = await props.params
  const readingListInSlugFormat = slug(params.list)
  const postsInReadingList = allCoreContent(
    sortPosts(
      allBlogs.filter(
        (post) =>
          post.readingList && post.readingList.map((t) => slug(t)).includes(readingListInSlugFormat)
      )
    )
  )

  if (!readingListInSlugFormat || !postsInReadingList || postsInReadingList.length < 1) {
    return notFound()
  }

  const readingListName = getListNameFromSlug(readingListInSlugFormat)

  const { initialDisplayPosts, pagination } = getPaginationVariables(postsInReadingList, 1)

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
