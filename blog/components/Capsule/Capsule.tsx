import { slug } from 'github-slugger'
import Link from 'next/link'

interface ICapsule {
  text: string
  count?: number
  urlPrefix: string // => /tags/
}

const Capsule = ({ text, count, urlPrefix }: ICapsule) => {
  return (
    <Link
      href={`${urlPrefix}${slug(text)}`}
      className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 mt-2 mr-2 text-base font-medium uppercase hover:bg-gray-50"
    >
      <span className="ring-primary-500 inline-flex items-center rounded-full px-4 py-2 text-xs font-medium text-gray-600 ring-1 ring-inset">
        {count ? `${text} (${count})` : text}
      </span>
    </Link>
  )
}

export default Capsule
