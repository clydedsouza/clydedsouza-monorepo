import Comments from '@/components/Comments/Comments'
import siteMetadata from '@/data/siteMetadata'
import Link from 'next/link'
import { LayoutProps } from '../types/types'

const editUrl = (path) => `${siteMetadata.siteRepo}/blob/main/data/${path}`
const discussUrl = (path) =>
  `https://mobile.twitter.com/search?q=${encodeURIComponent(`${siteMetadata.siteUrl}/${path}`)}`

export const PostBody = ({ content, authorDetails, next, prev, children }: LayoutProps) => {
  const { filePath, path, slug } = content

  return (
    <div className="pt-2 xl:col-span-3 xl:row-span-2 xl:pb-0">
      <div className="prose dark:prose-invert max-w-none pb-8">{children}</div>
      <div className="pb-6 text-sm text-gray-700 dark:text-gray-300">
        <Link href={discussUrl(path)} rel="nofollow">
          Discuss on Twitter
        </Link>
        {` • `}
        <Link href={editUrl(filePath)}>View on GitHub</Link>
      </div>
      {siteMetadata.comments && (
        <div className="pt-6 pb-6 text-center text-gray-700 dark:text-gray-300" id="comment">
          <Comments slug={slug} />
        </div>
      )}
    </div>
  )
}
