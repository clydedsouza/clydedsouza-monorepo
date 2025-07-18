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
    <div className="container">
      <div className="flex flex-row">
        <div className="basis-2/3">
          <div className="relative aspect-[16/9] w-full">
            <Image fill alt={''} src={post.images[0]} priority={true} />
          </div>
        </div>
        <div className="m-4 basis-1/3">
          <Link
            className="hover:text-brand underline transition-colors"
            href={`/posts/${post.slug}`}
          >
            <h3 className="text-5xl font-bold">{post.title}</h3>
          </Link>
          <div className="my-4 text-2xl font-medium text-slate-600">{post.subtitle}</div>
          <div className="my-2 max-w-3xl text-gray-500">{post.readingTime.text}</div>
          <div className="my-2 max-w-3xl text-gray-500">
            Published <time dateTime={post.date}>{formatDate(post.date, siteMetadata.locale)}</time>
          </div>
        </div>
      </div>
    </div>
  )
}
