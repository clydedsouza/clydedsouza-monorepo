'use client'

import { IPaginationProps, Pagination } from '@/components/Pagination/Pagination'
import { PostItems } from '@/components/PostItems/PostItems'
import { TagSidebar } from '@/components/TagSidebar/TagSidebar'
import tagData from 'app/data/static/tags.json'
import type { Blog } from 'contentlayer/generated'
import { usePathname } from 'next/navigation'
import { CoreContent } from 'pliny/utils/contentlayer'

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
      <div>
        <div className="pt-6 pb-6">
          <h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 xl:hidden dark:text-gray-100">
            {title}
          </h1>
        </div>
        <div className="flex sm:space-x-24">
          <aside className="hidden xl:block">
            <TagSidebar pathname={pathname} sortedTags={sortedTags} tagCounts={tagCounts} />
          </aside>

          <div>
            <PostItems posts={displayPosts} />
            {pagination && pagination.totalPages > 1 && (
              <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
            )}
          </div>
        </div>
      </div>
    </>
  )
}
