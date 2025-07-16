'use client'

import Link from '@/components/CustomLink/Link'
import { slug } from 'github-slugger'

export const TagSidebar = ({
  pathname,
  sortedTags,
  tagCounts,
}: {
  pathname: string
  sortedTags: string[]
  tagCounts: Record<string, number>
}) => {
  return (
    <div className="hidden h-full max-h-screen max-w-[280px] min-w-[280px] flex-wrap overflow-auto rounded-sm bg-gray-50 pt-5 shadow-md sm:flex dark:bg-gray-900/70 dark:shadow-gray-800/40">
      <div className="px-6 py-4">
        {pathname.startsWith('/blog') ? (
          <h3 className="text-primary-500 font-bold uppercase">All tags</h3>
        ) : (
          <Link
            href={`/blog`}
            className="hover:text-primary-500 dark:hover:text-primary-500 font-bold text-gray-700 uppercase dark:text-gray-300"
          >
            All tags
          </Link>
        )}
        <ul>
          {sortedTags.map((t) => {
            return (
              <li key={t} className="my-3">
                {decodeURI(pathname.split('/tags/')[1]) === slug(t) ? (
                  <h3 className="text-primary-500 inline px-3 py-2 text-sm font-bold uppercase">
                    {`${t} (${tagCounts[t]})`}
                  </h3>
                ) : (
                  <Link
                    href={`/tags/${slug(t)}`}
                    className="hover:text-primary-500 dark:hover:text-primary-500 px-3 py-2 text-sm font-medium text-gray-500 uppercase dark:text-gray-300"
                    aria-label={`View posts tagged ${t}`}
                  >
                    {`${t} (${tagCounts[t]})`}
                  </Link>
                )}
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
