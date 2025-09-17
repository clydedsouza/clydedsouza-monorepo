import Capsule from '@/components/Capsule/Capsule'
import SectionContainer from '@/components/Layouts/SectionContainer'
import readingListData from 'app/data/static/readingList.json'
import { genPageMetadata } from 'lib/seo'

export const metadata = genPageMetadata({
  title: 'Reading Lists',
  description: "Find articles to read using the curated list of topics I've compiled",
})

export default async function Page() {
  const readingListCounts = readingListData as Record<string, number>
  const readingListKeys = Object.keys(readingListCounts)
  const sortedReadingList = readingListKeys.sort(
    (a, b) => readingListCounts[b] - readingListCounts[a]
  )

  return (
    <SectionContainer>
      <h1 className="py-6 text-5xl font-extrabold tracking-tight text-gray-900 sm:text-5xl sm:leading-10 md:text-5xl md:leading-14 dark:text-gray-100">
        Reading lists
      </h1>

      <div className="flex w-full flex-wrap">
        {sortedReadingList.length === 0
          ? 'No lists curated just yet.'
          : sortedReadingList.map((listName) => {
              return (
                <div key={listName} className="mt-2 mr-2 mb-2">
                  <Capsule
                    text={listName}
                    count={readingListCounts[listName]}
                    urlPrefix="/lists/"
                  />
                </div>
              )
            })}
      </div>
    </SectionContainer>
  )
}
