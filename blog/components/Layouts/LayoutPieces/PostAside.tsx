import Capsule from '@/components/Capsule/Capsule'
import { CustomAd } from '@/components/CustomAd/CustomAd'
import Image from '@/components/CustomImage/Image'
import { NewsletterSignupForm } from '@/components/Newsletter/NewsletterSignupForm'
import Link from 'next/link'
import { LayoutProps } from '../types/types'
import VerticalAd from '@/components/GoogleAds/VerticalAd'

export const PostAside = ({ content, authorDetails, next, prev, children }: LayoutProps) => {
  const { tags, path, readingList } = content

  const basePath = path.split('/')[0]

  return (
    <aside>
      <dl className="pt-4 pb-2 xl:pt-4">
        <dt className="sr-only">Authors</dt>
        <dd>
          <ul className="flex flex-wrap justify-center gap-4 sm:space-x-12 xl:block xl:space-y-8 xl:space-x-0">
            {authorDetails.map((author) => (
              <>
                <li className="mb-4 flex items-center space-x-2" key={author.name}>
                  {author.avatar && (
                    <Image
                      src={author.avatar}
                      width={38}
                      height={38}
                      alt="avatar"
                      className="h-10 w-10 rounded-full"
                    />
                  )}
                  <dl className="text-sm leading-5 font-medium whitespace-nowrap">
                    <dt className="sr-only">Name</dt>
                    <dd className="text-gray-900 dark:text-gray-100">{author.name}</dd>
                    <dt className="sr-only">Twitter</dt>
                    <dd>
                      {author.twitter && (
                        <Link
                          href={author.twitter}
                          className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                        >
                          {author.twitter
                            .replace('https://twitter.com/', '@')
                            .replace('https://x.com/', '@')}
                        </Link>
                      )}
                    </dd>
                  </dl>
                </li>
                <li className="mb-4 flex items-center space-x-2" key={author.twitter}>
                  <dt className="sr-only">Author bio</dt>
                  <dd className="text-sm text-gray-600 dark:text-gray-100">{author.bio}</dd>
                </li>
                <li>
                  <dt className="sr-only">Kofi support button</dt>
                  <a href={author.kofi} target="_blank">
                    <img
                      height="36"
                      style={{ border: '0px', height: '36px' }}
                      src="https://storage.ko-fi.com/cdn/kofi6.png?v=6"
                      alt="Buy Me a Coffee at ko-fi.com"
                      className="rounded-full"
                    />
                  </a>
                </li>
              </>
            ))}
          </ul>
        </dd>
      </dl>

      <NewsletterSignupForm />

      <VerticalAd adSlot="xyz" />

      <div className="text-sm leading-5 font-medium xl:col-start-1 xl:row-start-2">
        {tags && tags.length > 0 && (
          <div className="py-4">
            <h2 className="mb-2 text-xs font-bold tracking-wide text-gray-800 uppercase dark:text-gray-400">
              Tags
            </h2>
            <div className="flex flex-wrap">
              {tags.map((tag) => (
                <Capsule key={tag} text={tag} urlPrefix="/tags/" />
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="text-sm leading-5 font-medium xl:col-start-1 xl:row-start-2">
        {readingList && readingList.length > 0 && (
          <div className="py-4">
            <h2 className="mb-2 text-xs font-bold tracking-wide text-gray-800 uppercase dark:text-gray-400">
              Reading list
            </h2>
            <div className="flex flex-wrap">
              {readingList.map((listItem) => (
                <Capsule key={listItem} text={listItem} urlPrefix="/lists/" />
              ))}
            </div>
          </div>
        )}
      </div>

      <CustomAd isRandom={false} adKey="MAMABOOKPAPERBACK" />

      <div>
        {(next || prev) && (
          <div className="flex justify-between gap-2 py-3 xl:block xl:space-y-8">
            <h2 className="mb-2 text-xs font-bold tracking-wide text-gray-800 uppercase dark:text-gray-400">
              Next reads
            </h2>
            {prev && prev.path && (
              <Link href={`/${prev.path}`}>
                <div>
                  <Image
                    src={prev.images[0]}
                    alt={prev.title}
                    width={302}
                    height={102}
                    className="aspect-video object-cover"
                  />
                </div>
                <div className="my-1">
                  <h3 className="text-lg font-semibold text-gray-800">{prev.title}</h3>
                </div>
                <div className="my-1 mb-4">
                  <h3 className="text-gray-600">{prev.readingTime.text}</h3>
                </div>
              </Link>
            )}
            {next && next.path && (
              <Link href={`/${next.path}`}>
                <div>
                  <Image
                    src={next.images[0]}
                    alt={next.title}
                    width={302}
                    height={102}
                    className="aspect-video object-cover"
                  />
                </div>
                <div className="my-1">
                  <h3 className="text-lg font-semibold text-gray-800">{next.title}</h3>
                </div>
                <div className="my-1">
                  <h3 className="text-gray-600">{next.readingTime.text}</h3>
                </div>
              </Link>
            )}
          </div>
        )}
      </div>

      <div>TODO: google ad, newsletter signup, personal ad, share buttons</div>
    </aside>
  )
}
