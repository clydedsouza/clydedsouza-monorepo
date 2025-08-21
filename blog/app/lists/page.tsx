import Capsule from '@/components/Capsule/Capsule'
import readingListData from 'app/data/static/readingList.json'
import { genPageMetadata } from 'lib/seo'

export const metadata = genPageMetadata({ title: 'Tags', description: 'Things I blog about' })

export default async function Page() {
  const readingListCounts = readingListData as Record<string, number>
  const readingListKeys = Object.keys(readingListCounts)
  const sortedReadingList = readingListKeys.sort(
    (a, b) => readingListCounts[b] - readingListCounts[a]
  )

  return (
    <>
      <div className="flex flex-col items-start justify-start divide-y divide-gray-200 md:mt-24 md:flex-row md:items-center md:justify-center md:space-x-6 md:divide-y-0 dark:divide-gray-700">
        <div className="space-x-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:border-r-2 md:px-6 md:text-6xl md:leading-14 dark:text-gray-100">
            Lists
          </h1>
        </div>
        <div className="flex max-w-lg flex-wrap">
          {readingListKeys.length === 0 && 'No lists found.'}
          {sortedReadingList.map((listName) => {
            return (
              <div key={listName} className="mt-2 mr-5 mb-2">
                <Capsule
                  text={listName}
                  count={readingListCounts[listName]}
                  urlPrefix="/lists/"
                />
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}
