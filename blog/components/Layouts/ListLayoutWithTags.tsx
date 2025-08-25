'use client'

import readingListData from '@/app/data/static/readingList.json'
import tagData from '@/app/data/static/tags.json'
import { IPaginationProps, Pagination } from '@/components/Pagination/Pagination'
import { Sidebar } from '@/components/Sidebar/Sidebar'
import type { Blog } from 'contentlayer/generated'
import { CoreContent } from 'pliny/utils/contentlayer'
import { PostItemsNoLimit } from '../PostItems/PostItemsNoLimit'
import SectionContainer from './SectionContainer'

interface ListLayoutProps {
  posts: CoreContent<Blog>[]
  title: string
  initialDisplayPosts?: CoreContent<Blog>[]
  pagination?: IPaginationProps
  sidebarType?: 'TAGS' | 'LISTS'
}

export default function ListLayoutWithTags({
  posts,
  title,
  initialDisplayPosts = [],
  pagination,
  sidebarType,
}: ListLayoutProps) {
  const sidebarItemTotals =
    sidebarType === 'TAGS'
      ? (tagData as Record<string, number>)
      : (readingListData as Record<string, number>)
  const sidebarItemKeys = Object.keys(sidebarItemTotals)
  const sidebarSortedItems = sidebarItemKeys.sort(
    (a, b) => sidebarItemTotals[b] - sidebarItemTotals[a]
  )

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
            <Sidebar
              title={sidebarType === 'TAGS' ? 'All tags' : 'All reading lists'}
              items={sidebarSortedItems}
              itemCounts={sidebarItemTotals}
              ariaLabel={sidebarType === 'TAGS' ? 'View posts tagged' : 'View posts in list'}
            />
          </aside>
        </div>
      </SectionContainer>
    </>
  )
}
