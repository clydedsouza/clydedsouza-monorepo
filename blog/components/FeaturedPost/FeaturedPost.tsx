import siteMetadata from '@/data/siteMetadata'
import { Blog } from 'contentlayer/generated'
import Image from 'next/image'
import Link from 'next/link'
import { CoreContent } from 'pliny/utils/contentlayer'
import { formatDate } from 'pliny/utils/formatDate'

export const FeaturedPost = ({ posts }: { posts: CoreContent<Blog>[] }) => {
  const post = posts[0]

  if (!post) {
    return <></>
  }

  return (
    <div className="container w-full max-w-full">
      <h2 className="sr-only">Featured post</h2>
      <Link className="hover:text-brand" href={`/posts/${post.slug}`}>
        <div className="flex flex-col lg:flex-row">
          <div className="w-full md:w-full lg:w-1/2">
            <div className="relative aspect-[16/9] w-full">
              <Image alt={''} src={post.images[0]} priority={true} objectFit="cover" fill />
            </div>
          </div>
          <div className="my-4 w-full md:w-full lg:m-4 lg:w-1/2">
            <h3 className="text-2xl font-bold md:text-3xl lg:text-4xl dark:text-slate-50">
              {post.title}
            </h3>
            <div className="my-2 text-lg font-medium text-slate-600 md:text-xl lg:text-2xl dark:text-slate-100">
              {post.subtitle}
            </div>
            <div className="my-2 max-w-3xl text-gray-500 dark:text-slate-200">
              {post.readingTime.text}
            </div>
            <div className="my-2 max-w-3xl text-gray-500 dark:text-slate-200">
              Published{' '}
              <time dateTime={post.date}>{formatDate(post.date, siteMetadata.locale)}</time>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}
