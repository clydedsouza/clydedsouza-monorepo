import { Suspense } from "react";

import { sanityFetch } from "@/sanity/lib/live";
import {
  latestTenPostsQuery,
  latestTenReadingListsQuery,
} from "@/sanity/lib/queries";
import { urlForImage } from "@/sanity/lib/utils";
import { stegaClean } from "@sanity/client/stega";
import { Image } from "next-sanity/image";
import Link from "next/link";
import DateComponent from "./components/Date";

const HighlightPost = (props: any) => {
  const { post } = props;
  return (
    <div className="container">
      <Link
        className="hover:text-brand underline transition-colors"
        href={`/posts/${post.slug}`}
      >
        <span className="absolute inset-0 z-10" />
      </Link>
      <div className="flex flex-row">
        <div className="basis-2/3">
          <div className="relative w-full aspect-[16/9]">
            <Image
              // width={getImageDimensions(post.coverImage).width / 2}
              // height={getImageDimensions(post.coverImage).height / 2}
              fill
              alt={stegaClean(post.coverImage?.alt) || ""}
              src={urlForImage(post.coverImage)?.url() as string}
              priority={true}
            />
          </div>
        </div>
        <div className="basis-1/3 m-4">
          <h2 className="text-5xl font-bold">{post.title}</h2>
          <div className="text-2xl font-medium text-slate-600 my-4">
            {post.excerpt}
          </div>
          <div className="max-w-3xl flex gap-4 items-center">
            <div className={`text-gray-500 `}>
              <DateComponent dateString={post.date} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const FeaturedPosts = (props: any) => {
  const { posts } = props;
  return (
    <div className="container">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 my-8">
        {posts.map((post: any) => (
          <div key={post._id} className="flex flex-col  overflow-hidden">
            <Link
              className="hover:text-brand underline transition-colors"
              href={`/posts/${post.slug}`}
            >
              <div className="relative aspect-[2/1] w-full">
                <Image
                  fill
                  alt={stegaClean(post.coverImage?.alt) || ""}
                  src={urlForImage(post.coverImage)?.url() as string}
                  className="object-cover"
                  priority={true}
                />
              </div>
              <div className="flex flex-col flex-1 py-2">
                <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
                <p className="text-gray-600 ">{post.excerpt}</p>
                <p className="text-gray-600 ">
                  <DateComponent dateString={post.date} />
                </p>
              </div>
              <span className="absolute inset-0 z-10" />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

const ReadingLists = (props: any) => {
  const { readingLists } = props;
  const listsToShow = readingLists; //.slice(0, 5);

  return (
    <div className="container my-12">
      <div
        className={`grid gap-4 items-stretch`}
        style={{
          gridTemplateColumns: `auto repeat(${listsToShow.length}, minmax(0, 1fr))`,
        }}
      >
        {/* Static label */}
        <div className="flex items-center font-semibold text-gray-700">
          Reading
          <br /> lists
          <Link
            className="rounded-full flex gap-4 items-center bg-black hover:bg-teal-500 focus:bg-teal-500 py-2 px-4 justify-center sm:py-3 sm:px-6 text-white transition-colors duration-200"
            href="https://github.com/sanity-io/sanity-template-nextjs-clean"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="whitespace-nowrap">Visit my website</span>
          </Link>
        </div>
        {/* Reading list cards */}
        {listsToShow.map(
          (readingList: any) => (
            console.log(readingList),
            (
              <Link
                key={readingList._id}
                href={`/posts/${readingList.slug}`}
                className="flex flex-col bg-white rounded-lg shadow hover:shadow-lg transition-shadow overflow-hidden"
              >
                <div className="relative aspect-[2/1] w-full">
                  {/* <Image
                  fill
                  alt={stegaClean(readingList.coverImage?.alt) || ""}
                  src={urlForImage(readingList.coverImage)?.url() as string}
                  className="object-cover"
                  priority={true}
                /> */}
                </div>
                <div className="flex flex-col flex-1 p-2">
                  <h2 className="text-base font-bold mb-1">
                    {readingList.title}
                  </h2>
                  <p className="text-gray-600 text-sm line-clamp-2">
                    {readingList.excerpt}
                  </p>
                </div>
              </Link>
            )
          )
        )}
        <div className="flex items-center font-semibold text-md text-gray-700">
          View all
          <br /> lists
        </div>
      </div>
    </div>
  );
};

export default async function Page() {
  const { data: allPostsAndPages } = await sanityFetch({
    query: latestTenPostsQuery,
  });
  const { data: allReadingLists } = await sanityFetch({
    query: latestTenReadingListsQuery,
  });

  console.log(allPostsAndPages);
  console.log(allReadingLists);

  const featured3Posts = allPostsAndPages.slice(1, 4);
  const next3Posts = allPostsAndPages.slice(5, 8);

  // homepage
  // latest post  gets full row - image on the left, title and excerpt on the right
  // 1 row 3 cols of latest posts
  // subscribe to newsletter section
  // 1 more row of posts?
  // reading lists?
  // tags?

  return (
    <>
      <Suspense>
        <HighlightPost post={allPostsAndPages[0]} />
      </Suspense>
      <Suspense>
        <FeaturedPosts posts={featured3Posts} />
      </Suspense>
      <Suspense>
        <FeaturedPosts posts={next3Posts} />
      </Suspense>
      <div className="container my-12">
        <h2>Newsletter</h2>
      </div>
      <Suspense>
        <ReadingLists readingLists={allReadingLists} />
      </Suspense>
    </>
  );
}
