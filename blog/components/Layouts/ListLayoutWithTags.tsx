'use client'

import tagData from '@/app/data/static/tags.json'
import { IPaginationProps, Pagination } from '@/components/Pagination/Pagination'
import { TagSidebar } from '@/components/TagSidebar/TagSidebar'
import type { Blog } from 'contentlayer/generated'
import { usePathname } from 'next/navigation'
import { CoreContent } from 'pliny/utils/contentlayer'
import { PostItemsNoLimit } from '../PostItems/PostItemsNoLimit'
import SectionContainer from './SectionContainer'

interface ListLayoutProps {
  posts: CoreContent<Blog>[]
  title: string
  initialDisplayPosts?: CoreContent<Blog>[]
  pagination?: IPaginationProps
}

export default function ListLayoutWithTags({
  posts,
  title,
  initialDisplayPosts = [],
  pagination,
}: ListLayoutProps) {
  const pathname = usePathname()
  const tagCounts = tagData as Record<string, number>
  const tagKeys = Object.keys(tagCounts)
  const sortedTags = tagKeys.sort((a, b) => tagCounts[b] - tagCounts[a])

  const displayPosts = initialDisplayPosts.length > 0 ? initialDisplayPosts : posts

  return (
    <>
      <SectionContainer>
        <h1 className="py-6 text-5xl font-extrabold tracking-tight text-gray-900 sm:text-5xl sm:leading-10 md:text-5xl md:leading-14 dark:text-gray-100">
          {title}
        </h1>
        <div className="flex sm:space-x-6">
          <div>
            <PostItemsNoLimit posts={displayPosts} />
            {pagination && pagination.totalPages > 1 && (
              <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
            )}
          </div>
          <aside className="hidden xl:block">
            <TagSidebar pathname={pathname} sortedTags={sortedTags} tagCounts={tagCounts} />
          </aside>
        </div>
      </SectionContainer>
    </>
  )
}
