import siteMetadata from '@/data/siteMetadata'
import { Blog } from 'contentlayer/generated'
import { CoreContent } from 'pliny/utils/contentlayer'
import { formatDate } from 'pliny/utils/formatDate'

export const PostHeader = ({ content }: { content: CoreContent<Blog> }) => {
  const { date, title, subtitle, readingTime } = content
  return (
    <header className="py-6">
      <div className="space-y-1 text-center">
        <dl className="space-y-4">
          <div>
            <dt className="sr-only">Published on</dt>
            <span className="ml-2 inline-block align-middle text-lg text-gray-700 font-stretch-ultra-condensed dark:text-gray-300">
              <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
            </span>
            <span className="ml-2">·</span>
            <dt className="sr-only">Reading time</dt>
            <span className="ml-2 inline-block align-middle text-lg text-gray-700 font-stretch-ultra-condensed dark:text-gray-300">
              {readingTime.text}
            </span>
          </div>
        </dl>
        <div>
          <h1 className="text-3xl leading-9 font-extrabold text-gray-800 font-stretch-ultra-condensed sm:text-4xl sm:leading-10 md:text-[42px] md:leading-14 dark:text-gray-100">
            {title}
          </h1>
        </div>
        <div>
          <h2 className="text-xl leading-10 font-medium tracking-tight text-slate-500 sm:text-2xl md:text-2xl dark:text-gray-100">
            {subtitle}
          </h2>
        </div>
      </div>
    </header>
  )
}
