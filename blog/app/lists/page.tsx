import Capsule from '@/components/Capsule/Capsule'
import SectionContainer from '@/components/Layouts/SectionContainer'
import staticReadingListData from 'app/data/static/readingList.json'
import { genPageMetadata } from 'lib/seo'

export const metadata = genPageMetadata({
  title: 'Reading Lists',
  description: "Find articles to read using the curated list of topics I've compiled",
})

export default async function Page() {
  const allReadingListsWithCount = staticReadingListData as Record<string, number>
  const sortedReadingLists = Object.keys(allReadingListsWithCount).sort(
    (a, b) => allReadingListsWithCount[b] - allReadingListsWithCount[a]
  )

  return (
    <SectionContainer>
      <h1 className="py-6 text-5xl font-extrabold tracking-tight text-gray-900 sm:text-5xl sm:leading-10 md:text-5xl md:leading-14 dark:text-gray-100">
        Reading lists
      </h1>

      <div className="flex w-full flex-wrap">
        {sortedReadingLists.length === 0
          ? 'No reading lists curated just yet.'
          : sortedReadingLists.map((readingList) => {
              return (
                <div key={readingList} className="mt-2 mr-2 mb-2">
                  <Capsule
                    text={readingList}
                    count={allReadingListsWithCount[readingList]}
                    urlPrefix="/lists/"
                  />
                </div>
              )
            })}
      </div>
    </SectionContainer>
  )
}
