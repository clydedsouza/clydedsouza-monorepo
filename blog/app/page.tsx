import { FeaturedPost } from '@/components/FeaturedPost/FeaturedPost'
import Link from '@/components/Link'
import { PostItems } from '@/components/PostItems/PostItems'
import siteMetadata from '@/data/siteMetadata'
import { allBlogs, Blog } from 'contentlayer/generated'
import NewsletterForm from 'pliny/ui/NewsletterForm'
import { allCoreContent, CoreContent, sortPosts } from 'pliny/utils/contentlayer'

export default async function Page() {
  const sortedPostsInDescOrder: Blog[] = sortPosts(allBlogs)
  const posts: CoreContent<Blog>[] = allCoreContent(sortedPostsInDescOrder)
  console.log(posts)
  console.log(posts.forEach((post) => post.title + ' dwd ' + post.subtitle))

  return (
    <>
      <FeaturedPost posts={posts} />
      <div className="grid grid-cols-1 gap-8 pt-6 sm:grid-cols-2 md:grid-cols-2">
        <h2 className="text-3xl font-semibold">Hot off the press</h2>
        <div className="xs:justify-start flex justify-start text-base font-medium sm:justify-start lg:justify-end">
          <Link
            href="/blog"
            className="flex items-center justify-center gap-4 rounded-full bg-black px-4 py-2 text-white transition-colors duration-200 hover:bg-teal-500 focus:bg-teal-500 sm:px-6 sm:py-2 dark:bg-teal-500 dark:hover:bg-black dark:focus:bg-black"
            aria-label="All posts"
          >
            View all Posts
          </Link>
        </div>
      </div>
      <PostItems posts={posts.slice(1, 4)} />
      {siteMetadata.newsletter?.provider && (
        <div className="flex items-center justify-center pt-4">
          <NewsletterForm />
        </div>
      )}
    </>
  )
}
