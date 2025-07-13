import { FeaturedPost } from '@/components/Homepage/FeaturedPost'
import { PostItems } from '@/components/Homepage/PostItems'
import Link from '@/components/Link'
import siteMetadata from '@/data/siteMetadata'
import { Blog } from 'contentlayer/generated'
import NewsletterForm from 'pliny/ui/NewsletterForm'
import { CoreContent } from 'pliny/utils/contentlayer'

export default function Homepage({ posts }: { posts: CoreContent<Blog>[] }) {
  console.log(posts)

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

      {/* <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {!posts.length && 'No posts found.'}
          {posts.slice(0, MAX_DISPLAY).map((post) => {
            const { slug, date, title, summary, tags } = post
            return (
              <li key={slug} className="py-12">
                <article>
                  <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                    <dl>
                      <dt className="sr-only">Published on</dt>
                      <dd className="text-base leading-6 font-medium text-gray-500 dark:text-gray-400">
                        <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
                      </dd>
                    </dl>
                    <div className="space-y-5 xl:col-span-3">
                      <div className="space-y-6">
                        <div>
                          <h2 className="text-2xl leading-8 font-bold tracking-tight">
                            <Link
                              href={`/blog/${slug}`}
                              className="text-gray-900 dark:text-gray-100"
                            >
                              {title}
                            </Link>
                          </h2>
                          <div className="flex flex-wrap">
                            {tags.map((tag) => (
                              <Tag key={tag} text={tag} />
                            ))}
                          </div>
                        </div>
                        <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                          {summary}
                        </div>
                      </div>
                      <div className="text-base leading-6 font-medium">
                        <Link
                          href={`/blog/${slug}`}
                          className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                          aria-label={`Read more: "${title}"`}
                        >
                          Read more &rarr;
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              </li>
            )
          })}
        </ul> */}

      {siteMetadata.newsletter?.provider && (
        <div className="flex items-center justify-center pt-4">
          <NewsletterForm />
        </div>
      )}
    </>
  )
}
