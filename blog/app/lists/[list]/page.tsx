import readingListData from '@/app/data/static/readingList.json'
import ListLayout from '@/components/Layouts/ListLayoutWithTags'
import siteMetadata from '@/data/siteMetadata'
import tagData from 'app/data/static/tags.json'
import { allBlogs } from 'contentlayer/generated'
import { slug } from 'github-slugger'
import { getPaginationVariables } from 'lib/pagination'
import { genPageMetadata } from 'lib/seo'
import { Metadata } from 'next'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'

export async function generateMetadata(props: {
  params: Promise<{ list: string }>
}): Promise<Metadata> {
  const params = await props.params
  const tag = decodeURI(params.list)
  return genPageMetadata({
    title: tag,
    description: `${siteMetadata.title} ${tag} tagged content`,
    alternates: {
      canonical: './',
      types: {
        'application/rss+xml': `${siteMetadata.siteUrl}/tags/${tag}/feed.xml`,
      },
    },
  })
}

export const generateStaticParams = async () => {
  const tagCounts = tagData as Record<string, number>
  const tagKeys = Object.keys(tagCounts)
  return tagKeys.map((tag) => ({
    tag: encodeURI(tag),
  }))
}

export default async function ReadingListPage(props: { params: Promise<{ list: string }> }) {
  const params = await props.params
  const listNameInSlugFormat = decodeURI(params.list)
  const postsInReadingList = allCoreContent(
    sortPosts(
      allBlogs.filter(
        (post) =>
          post.readingList && post.readingList.map((t) => slug(t)).includes(listNameInSlugFormat)
      )
    )
  )

  const listName =
    Object.keys(readingListData).find((item) => slug(item) === listNameInSlugFormat) ??
    listNameInSlugFormat

  const { initialDisplayPosts, pagination } = getPaginationVariables(postsInReadingList, 1)

  return (
    <ListLayout
      posts={postsInReadingList}
      initialDisplayPosts={initialDisplayPosts}
      pagination={pagination}
      title={listName}
      sidebarType="LISTS"
    />
  )
}
