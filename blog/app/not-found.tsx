import Link from '@/components/CustomLink/Link'
import SectionContainer from '@/components/Layouts/SectionContainer'

export default function NotFound() {
  return (
    <SectionContainer>
      <h1 className="py-6 text-5xl font-extrabold tracking-tight text-gray-900 sm:text-5xl sm:leading-10 md:text-5xl md:leading-14 dark:text-gray-100">
        Sorry, this page doesn't exist.
      </h1>

      <div className="flex w-full flex-wrap">
        Try heading to the homepage for a fresh start or using the search above to look for content.
      </div>
      <div className="my-6 flex w-full flex-wrap">
        <Link
          href="/"
          className="bg-primary-500 flex items-center justify-center gap-4 rounded-full px-4 py-2 text-white transition-colors duration-200 hover:bg-slate-800 focus:bg-slate-800 sm:px-8 sm:py-2"
        >
          Back to homepage
        </Link>
      </div>
    </SectionContainer>
  )
}
