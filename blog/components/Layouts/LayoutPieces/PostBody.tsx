import Comments from '@/components/Comments/Comments'
import siteMetadata from '@/data/siteMetadata'
import { LayoutProps } from '../types/types'

export const PostBody = ({ content, authorDetails, next, prev, children }: LayoutProps) => {
  const { slug } = content
  const isCommentsEnabled = process.env.IS_COMMENTS_ENABLED === 'true'

  return (
    <div className="pt-2 xl:col-span-3 xl:row-span-2 xl:pb-0">
      <div className="prose dark:prose-invert max-w-none pb-8">{children}</div>
      {isCommentsEnabled && siteMetadata.comments && (
        <div className="pt-6 pb-6 text-center text-gray-700 dark:text-gray-300" id="comment">
          <Comments slug={slug} />
        </div>
      )}
    </div>
  )
}
