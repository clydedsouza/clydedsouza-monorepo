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
  console.log(posts)

  return (
    <>
      <SectionContainer>
        <FeaturedPost posts={posts} />
        <div className="mb-0 grid grid-cols-3 gap-2 pt-6">
          <div className="col-span-2">
            <h2 className="text-primary-500 text-3xl font-semibold">Hot off the press</h2>
          </div>
          <div className="flex justify-end text-base font-medium">
            <Link
              href="/blog"
              className="bg-primary-500 flex items-center justify-center gap-4 rounded-full px-4 py-2 text-white transition-colors duration-200 hover:bg-slate-800 focus:bg-slate-800 sm:px-6 sm:py-2"
              aria-label="View all posts"
            >
              View all posts
            </Link>
          </div>
        </div>
        <PostItems posts={posts.slice(1, 5)} />
      </SectionContainer>
      <NewsletterSignupForm isFullWidth />
      {/* <SectionContainer>
        <PostItems posts={posts.slice(5, 9)} />
      </SectionContainer> */}
    </>
  )
}
