import siteMetadata from '@/data/siteMetadata'
import { Blog } from 'contentlayer/generated'
import Image from 'next/image'
import { CoreContent } from 'pliny/utils/contentlayer'
import { formatDate } from 'pliny/utils/formatDate'

export const RecommendedPost = (post: CoreContent<Blog>) => {
  return (
    <div>
      <div className="relative aspect-[16/9] w-full">
        <Image src={post.images[0]} alt={post.title} fill objectFit="cover" />
      </div>

      <h3 className="pt-2 text-lg font-bold text-gray-800 dark:text-slate-50">{post.title}</h3>
      <p className="my-1 max-h-100 text-base text-ellipsis text-gray-600 text-slate-600 dark:text-slate-100">
        {post.subtitle}
      </p>

      <div className="my-1 max-w-3xl text-sm text-gray-500 dark:text-slate-200">
        {post.readingTime.text}
      </div>
      <div className="my-1 max-w-3xl text-sm text-gray-500 dark:text-slate-200">
        Published <time dateTime={post.date}>{formatDate(post.date, siteMetadata.locale)}</time>
      </div>
    </div>
  )
}
