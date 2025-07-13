import siteMetadata from '@/data/siteMetadata'
import { Blog } from 'contentlayer/generated'
import Image from 'next/image'
import Link from 'next/link'
import { CoreContent } from 'pliny/utils/contentlayer'
import { formatDate } from 'pliny/utils/formatDate'

export const PostItems = ({ posts }: { posts: CoreContent<Blog>[] }) => {
  return (
    <div className="container">
      <div className="my-8 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
        {posts.map((post) => (
          <div key={post.slug} className="flex flex-col overflow-hidden">
            <div className="relative aspect-[2/1] w-full">
              <Image fill alt={''} src={post.images[0]} priority={true} />
            </div>
            <div className="flex flex-1 flex-col py-2">
              <Link
                className="hover:text-brand underline transition-colors"
                href={`/blog/${post.slug}`}
              >
                <h3 className="mb-2 text-2xl font-bold">{post.title}</h3>
              </Link>
              <p className="my-1 text-gray-600">{post.summary}</p>
              <div className="my-1 max-w-3xl text-gray-500">{post.readingTime.text}</div>
              <div className="my-1 max-w-3xl text-gray-500">
                Published{' '}
                <time dateTime={post.date}>{formatDate(post.date, siteMetadata.locale)}</time>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
