import ListLayout from '@/components/Layouts/ListLayoutWithTags'
import siteMetadata from '@/data/siteMetadata'
import tagData from 'app/data/static/tags.json'
import { allBlogs } from 'contentlayer/generated'
import { slug } from 'github-slugger'
import { getTagPageTitle } from 'lib/constants'
import { getPaginationVariables } from 'lib/pagination'
import { genPageMetadata } from 'lib/seo'
import { Metadata } from 'next'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'

export async function generateMetadata(props: {
  params: Promise<{ tag: string }>
}): Promise<Metadata> {
  const params = await props.params
  const tag = decodeURI(params.tag)
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
  const listName = decodeURI(params.list)
  const postsInReadingList = allCoreContent(
    sortPosts(
      allBlogs.filter(
        (post) => post.readingList && post.readingList.map((t) => slug(t)).includes(listName)
      )
    )
  )

  const { initialDisplayPosts, pagination } = getPaginationVariables(postsInReadingList, 1)

  return (
    <ListLayout
      posts={postsInReadingList}
      initialDisplayPosts={initialDisplayPosts}
      pagination={pagination}
      title={getTagPageTitle(listName)}
      sidebarType="LISTS"
    />
  )
}
