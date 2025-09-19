import ListLayout from '@/components/Layouts/ListLayoutWithTags'
import siteMetadata from '@/data/siteMetadata'
import staticTagData from 'app/data/static/tags.json'
import { allBlogs } from 'contentlayer/generated'
import { slug } from 'github-slugger'
import { POSTS_PER_PAGE } from 'lib/constants'
import { getPaginationVariables } from 'lib/pagination'
import { genPageMetadata } from 'lib/seo'
import { getTagNameFromSlug } from 'lib/staticDataUtils'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'

export async function generateMetadata(props: {
  params: Promise<{ tag: string; page: string }>
}): Promise<Metadata> {
  const params = await props.params
  const page = params.page
  const tagInSlugFormat = slug(params.tag)
  const tagName = getTagNameFromSlug(tagInSlugFormat)
  return genPageMetadata({
    title: `${tagName} | Page ${page} | Tags`,
    description: `Articles tagged ${tagName} in ${siteMetadata.title}`,
    alternates: {
      canonical: './',
      types: {
        'application/rss+xml': `${siteMetadata.siteUrl}/tags/${tagInSlugFormat}/feed.xml`,
      },
    },
  })
}

export const generateStaticParams = async () => {
  const allTagsWithCount = staticTagData as Record<string, number>
  return Object.keys(allTagsWithCount).flatMap((tag) => {
    const tagCount = allTagsWithCount[tag]
    const totalPages = Math.max(1, Math.ceil(tagCount / POSTS_PER_PAGE))
    return Array.from({ length: totalPages }, (_, i) => ({
      tag: slug(tag),
      page: (i + 1).toString(),
    }))
  })
}

export default async function TagPage(props: { params: Promise<{ tag: string; page: string }> }) {
  const params = await props.params
  const pageNumber = parseInt(params.page)
  const tagInSlugFormat = slug(params.tag)
  const postsWithTag = allCoreContent(
    sortPosts(
      allBlogs.filter(
        (post) => post.tags && post.tags.map((t) => slug(t)).includes(tagInSlugFormat)
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
    !tagInSlugFormat ||
    !postsWithTag ||
    postsWithTag.length < 1
  ) {
    return notFound()
  }

  const tagName = getTagNameFromSlug(tagInSlugFormat)

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
