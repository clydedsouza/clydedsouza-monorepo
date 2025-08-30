import siteMetadata from '@/data/siteMetadata'
import { Blog } from 'contentlayer/generated'
import Image from 'next/image'
import Link from 'next/link'
import { CoreContent } from 'pliny/utils/contentlayer'
import { formatDate } from 'pliny/utils/formatDate'

export const PostItems = ({ posts }: { posts: CoreContent<Blog>[] }) => {
  return (
    <div className="container w-full max-w-full">
      <div className="mt-4 mb-8 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post, idx) => (
          <div
            key={post.slug}
            className={
              idx === 3
                ? 'flex flex-col overflow-hidden lg:hidden'
                : 'flex flex-col overflow-hidden'
            }
          >
            <Link className="hover:text-brand" href={`/posts/${post.slug}`}>
              <div className="relative aspect-[16/9] w-full">
                <Image
                  fill
                  objectFit="cover"
                  placeholder="blur"
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII="
                  alt={''}
                  src={post.images[0]}
                />
              </div>
              <div className="flex flex-1 flex-col py-2">
                <h3 className="text-2xl font-bold dark:text-slate-50">{post.title}</h3>
                <p className="my-1 max-h-100 text-lg font-medium text-ellipsis text-gray-600 text-slate-600 dark:text-slate-100">
                  {post.summary}
                </p>
                <div className="my-1 max-w-3xl text-gray-500 dark:text-slate-200">
                  {post.readingTime.text}
                </div>
                <div className="my-1 max-w-3xl text-gray-500 dark:text-slate-200">
                  Published{' '}
                  <time dateTime={post.date}>{formatDate(post.date, siteMetadata.locale)}</time>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
