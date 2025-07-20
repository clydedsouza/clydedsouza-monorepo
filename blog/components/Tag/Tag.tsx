import { slug } from 'github-slugger'
import Link from 'next/link'
interface Props {
  text: string
}

const Tag = ({ text }: Props) => {
  return (
    <Link
      href={`/tags/${slug(text)}`}
      className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 mt-2 mr-3 text-sm font-medium uppercase"
    >
      <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-gray-500/10 ring-inset">
        {text.split(' ').join('-')}
      </span>
    </Link>
  )
}

export default Tag
