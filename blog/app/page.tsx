import { allBlogs, Blog } from 'contentlayer/generated'
import { allCoreContent, CoreContent, sortPosts } from 'pliny/utils/contentlayer'
import Homepage from './Homepage'

export default async function Page() {
  const sortedPostsInDescOrder: Blog[] = sortPosts(allBlogs)
  const posts: CoreContent<Blog>[] = allCoreContent(sortedPostsInDescOrder)

  return <Homepage posts={posts} />
}
