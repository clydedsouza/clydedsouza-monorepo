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
      className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 mt-2 mr-2"
    >
      <span className="inline-flex items-center rounded-full bg-gray-100 px-5 py-2 text-sm text-gray-600 hover:bg-gray-50">
        {count ? `${text} (${count})` : text}
      </span>
    </Link>
  )
}

export default Capsule
