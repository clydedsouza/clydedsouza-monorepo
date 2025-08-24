import SectionContainer from '@/components/Layouts/SectionContainer'
import ScrollTopAndComment from '@/components/ScrollTopAndComment/ScrollTopAndComment'
import { PostAside } from './LayoutPieces/PostAside'
import { PostBody } from './LayoutPieces/PostBody'
import { PostHeader } from './LayoutPieces/PostHeader'
import { LayoutProps } from './types/types'

export default function PostLayout({ content, authorDetails, next, prev, children }: LayoutProps) {
  const isScrollTopAndCommentEnabled = process.env.IS_SCROLLTOP_AND_COMMENTS_ENABLED ?? false
  return (
    <SectionContainer>
      {isScrollTopAndCommentEnabled && <ScrollTopAndComment />}
      <article className="xl:dark:divide-gray-700">
        <PostHeader content={content} />
        <div className="grid-rows-[auto_1fr] pb-8 xl:grid xl:grid-cols-4 xl:gap-x-6">
          <PostBody content={content} authorDetails={authorDetails} next={next} prev={prev}>
            {children}
          </PostBody>
          <PostAside content={content} authorDetails={authorDetails} next={next} prev={prev}>
            {children}
          </PostAside>
        </div>
      </article>
    </SectionContainer>
  )
}
