import Capsule from '@/components/Capsule/Capsule'
import SectionContainer from '@/components/Layouts/SectionContainer'
import tagData from 'app/data/static/tags.json'
import { genPageMetadata } from 'lib/seo'

export const metadata = genPageMetadata({
  title: 'Tags',
  description: 'Find articles to read using tags',
})

export default async function Page() {
  const tagCounts = tagData as Record<string, number>
  const tagKeys = Object.keys(tagCounts)
  const sortedTags = tagKeys.sort()

  return (
    <SectionContainer>
      <h1 className="py-6 text-5xl font-extrabold tracking-tight text-gray-900 sm:text-5xl sm:leading-10 md:text-5xl md:leading-14 dark:text-gray-100">
        Tags
      </h1>

      <div className="flex w-full flex-wrap">
        {sortedTags.length === 0
          ? 'No tags found.'
          : sortedTags.map((tag) => {
              return (
                <div key={tag} className="mt-2 mr-2 mb-2">
                  <Capsule text={tag} count={tagCounts[tag]} urlPrefix="/tags/" />
                </div>
              )
            })}
      </div>
    </SectionContainer>
  )
}
