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

export default async function TagPage(props: { params: Promise<{ tag: string }> }) {
  const params = await props.params
  const tagInSlugFormat = decodeURI(params.tag)
  const postsWithTag = allCoreContent(
    sortPosts(
      allBlogs.filter(
        (post) => post.tags && post.tags.map((t) => slug(t)).includes(tagInSlugFormat)
      )
    )
  )

  const tagName =
    Object.keys(tagData).find((item) => slug(item) === tagInSlugFormat) ?? tagInSlugFormat

  const { initialDisplayPosts, pagination } = getPaginationVariables(postsWithTag, 1)

  return (
    <ListLayout
      posts={postsWithTag}
      initialDisplayPosts={initialDisplayPosts}
      pagination={pagination}
      title={tagName}
      sidebarType="TAGS"
    />
  )
}
