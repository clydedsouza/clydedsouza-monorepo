'use client'

import Link from '@/components/CustomLink/Link'
import { slug } from 'github-slugger'
import { usePathname } from 'next/navigation'

/**
 * Returns the base part of the URL indicating the type of page we're in
 * @example
 * For `/lists/publishing-a-book` returns `/lists/`
 * For `/lists/github-actions/page/2` returns `/lists/`
 */
const getBaseUrlFromPathname = (pathname: string) => {
  return pathname.substring(0, pathname.substring(1).indexOf('/') + 2)
}

interface ISidebar {
  title: string
  items: string[]
  itemCounts: Record<string, number>
  ariaLabel: string
}

export const Sidebar = ({ title, items, itemCounts, ariaLabel }: ISidebar) => {
  const pathname = usePathname()
  const basePath = getBaseUrlFromPathname(pathname)

  return (
    <div className="h-100vh hidden max-h-screen max-w-[300px] min-w-[300px] flex-wrap overflow-x-hidden overflow-y-auto pt-5 sm:flex">
      <div className="px-3">
        <Link
          href={basePath}
          className="hover:text-primary-500 dark:hover:text-primary-500 font-bold text-gray-700 uppercase dark:text-gray-300"
        >
          {title}
        </Link>
        <ul>
          {items.map((item) => {
            const constructedItemUrl = `${basePath}${slug(item)}`

            return (
              <li key={item} className="my-3">
                {pathname.includes(constructedItemUrl) ? (
                  <h3 className="text-primary-500 inline truncate px-3 py-2 text-sm font-medium uppercase">
                    {`> ${item} (${itemCounts[item]})`}
                  </h3>
                ) : (
                  <Link
                    href={`${basePath}${slug(item)}`}
                    className="hover:text-primary-500 dark:hover:text-primary-500 truncate px-3 py-2 text-sm font-medium text-gray-500 uppercase dark:text-gray-300"
                    aria-label={`${ariaLabel} ${item}`}
                  >
                    {`${item} (${itemCounts[item]})`}
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
