import Link from '@/components/CustomLink/Link'
import { FeaturedPost } from '@/components/FeaturedPost/FeaturedPost'
import SectionContainer from '@/components/Layouts/SectionContainer'
import { NewsletterSignupForm } from '@/components/Newsletter/NewsletterSignupForm'
import { PostItems } from '@/components/PostItems/PostItems'
import { allBlogs, Blog } from 'contentlayer/generated'
import { allCoreContent, CoreContent, sortPosts } from 'pliny/utils/contentlayer'

export default async function Page() {
  const sortedPostsInDescOrder: Blog[] = sortPosts(allBlogs)
  const posts: CoreContent<Blog>[] = allCoreContent(sortedPostsInDescOrder)
  const isNewsletterSignupEnabled = process.env.NEXT_PUBLIC_IS_NEWSLETTER_SIGNUP_ENABLED === 'true'

  return (
    <>
      <SectionContainer>
        <FeaturedPost posts={posts} />
        <div className="mt-10 mb-0 grid grid-cols-3 gap-2">
          <div className="col-span-2">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Hot off the press
            </h2>
          </div>
          <div className="flex justify-end text-base font-medium">
            <Link
              href="/posts"
              className="bg-primary-500 flex items-center justify-center gap-4 rounded-full px-4 py-2 text-white transition-colors duration-200 hover:bg-slate-800 focus:bg-slate-800 sm:px-8 sm:py-2"
              aria-label="View all posts"
            >
              <span className="hidden md:block">View all posts</span>
              <span className="block md:hidden">View all</span>
            </Link>
          </div>
        </div>
        <PostItems posts={posts.slice(1, 5)} />
      </SectionContainer>
      {isNewsletterSignupEnabled && <NewsletterSignupForm isFullWidth />}
    </>
  )
}
