'use client'

import Link from '@/components/CustomLink/Link'
import { slug } from 'github-slugger'

export const Sidebar = ({
  title,
  items,
  itemCounts,
  pathname,
  pathnameIdentifier,
  ariaLabel,
}: {
  title: string
  items: string[]
  itemCounts: Record<string, number>
  pathname: string
  pathnameIdentifier: string //pathname.split('/tags')
  ariaLabel: string //View posts tagged
}) => {
  const affix = pathnameIdentifier + '/'
  return (
    <div className="h-100vh hidden max-h-screen max-w-[280px] min-w-[280px] flex-wrap overflow-auto pt-5 sm:flex">
      <div className="px-3">
        <Link
          href={pathnameIdentifier}
          className="hover:text-primary-500 dark:hover:text-primary-500 font-bold text-gray-700 uppercase dark:text-gray-300"
        >
          {title}
        </Link>
        <ul>
          {items.map((item) => {
            return (
              <li key={item} className="my-3">
                {decodeURI(pathname.split(affix)[1]) === slug(item) ? (
                  <h3 className="text-primary-500 inline px-3 py-2 text-sm font-bold uppercase">
                    {`${item} (${itemCounts[item]})`}
                  </h3>
                ) : (
                  <Link
                    href={`${affix}${slug(item)}`}
                    className="hover:text-primary-500 dark:hover:text-primary-500 px-3 py-2 text-sm font-medium text-gray-500 uppercase dark:text-gray-300"
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
