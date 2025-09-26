'use client'
import Capsule from '@/components/Capsule/Capsule'
import { CustomAd } from '@/components/CustomAd/CustomAd'
import Image from '@/components/CustomImage/Image'
import { NewsletterSignupForm } from '@/components/Newsletter/NewsletterSignupForm'

import { RecommendedPost } from '@/components/PostItems/RecommendedPost'
import { SocialShare } from '@/components/SocialShare/SocialShare'
import Link from 'next/link'
import { LayoutProps } from '../types/types'
import { GoogleAds } from '@/components/GoogleAds/GoogleAds'

export const PostAside = ({ content, authorDetails, next, prev, children }: LayoutProps) => {
  const { tags, readingList, title, subtitle } = content
  const isGoogleAdsEnabled = process.env.NEXT_PUBLIC_IS_GOOGLE_ADS_ENABLED === 'true'
  const isNewsletterSignupEnabled = process.env.NEXT_PUBLIC_IS_NEWSLETTER_SIGNUP_ENABLED === 'true'

  return (
    <aside>
      <div className="grid grid-cols-1 items-start gap-x-8 md:grid-cols-2 xl:grid-cols-1 xl:gap-y-4">
        <dl className="pb-2 xl:pt-2">
          <dt className="sr-only">Authors</dt>
          <dd>
            <ul className="flex flex-wrap justify-center gap-4 sm:space-x-12 xl:block xl:space-y-8 xl:space-x-0">
              {authorDetails.map((author) => (
                <div key={author.name}>
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
                  <li key={'kofiauthor'}>
                    <dt className="sr-only">Kofi support button</dt>
                    <a href={author.kofi} target="_blank" className="mr-2 inline-block">
                      <Image
                        height="32"
                        width="127"
                        style={{ border: '0px', height: '32px' }}
                        src="https://storage.ko-fi.com/cdn/kofi6.png?v=6"
                        alt="Buy Me a Coffee at ko-fi.com"
                        className="rounded-full"
                      />
                    </a>
                    <dt className="sr-only">Sponsor me button</dt>
                    <a
                      href="https://sponsor.clydedsouza.net/"
                      target="_blank"
                      className="inline-block"
                    >
                      <Image
                        height="32"
                        width="127"
                        style={{ border: '0px', height: '32px' }}
                        src="/static/images/sponsorme.png"
                        alt="Sponsor me button"
                        className="rounded-full"
                      />
                    </a>
                  </li>
                </div>
              ))}
            </ul>
          </dd>
        </dl>
        {isNewsletterSignupEnabled && <NewsletterSignupForm />}
      </div>

      <div className="mt-6 hidden xl:block">
        <SocialShare title={title} summary={subtitle} />
      </div>

      {isGoogleAdsEnabled && (
        <div className="grid grid-cols-1 items-start">
          <GoogleAds />
        </div>
      )}

      <div className="my-2 grid grid-cols-2 items-start gap-x-8 xl:grid-cols-1 xl:gap-y-4">
        <div className="text-sm font-medium">
          {tags && tags.length > 0 && (
            <>
              <h2 className="text-xs font-bold tracking-wide text-gray-800 uppercase dark:text-gray-400">
                Tags
              </h2>
              <div className="flex flex-wrap">
                {tags.map((tag) => (
                  <Capsule key={tag} text={tag} urlPrefix="/tags/" />
                ))}
              </div>
            </>
          )}
        </div>
        <div className="my-2 text-sm font-medium">
          {readingList && readingList.length > 0 && (
            <>
              <h2 className="text-xs font-bold tracking-wide text-gray-800 uppercase dark:text-gray-400">
                Reading list
              </h2>
              <div className="flex flex-wrap">
                {readingList.map((listItem) => (
                  <Capsule key={listItem} text={listItem} urlPrefix="/lists/" />
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      <CustomAd isRandom={true} />

      <div>
        {(next || prev) && (
          <>
            <h2 className="mb-2 block text-xs font-bold tracking-wide text-gray-800 uppercase dark:text-gray-400">
              Next reads
            </h2>
            <div
              className={`grid ${(next && !prev) || (!next && prev) ? 'grid-cols-1' : 'grid-cols-2'} items-start gap-x-8 xl:grid-cols-1 xl:gap-y-4`}
            >
              {next && next.path && (
                <Link href={`/${next.path}`}>
                  <RecommendedPost {...next} />
                </Link>
              )}

              {prev && prev.path && (
                <Link href={`/${prev.path}`}>
                  <RecommendedPost {...prev} />
                </Link>
              )}
            </div>
          </>
        )}
      </div>

      <div className="mt-2 hidden xl:block">
        <CustomAd isRandom={true} />
      </div>

      {/* {isGoogleAdsEnabled && (
        <div className="grid hidden w-[302px] grid-cols-1 items-start xl:block">
          <GoogleAds key={'optionalAd'} />
        </div>
      )} */}

      <div className="hidden xl:block">
        <CustomAd isRandom={true} />
      </div>
    </aside>
  )
}
