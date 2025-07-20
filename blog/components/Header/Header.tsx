import headerNavLinks from '@/components/Header/headerNavLinks'
import siteMetadata from '@/data/siteMetadata'
import Link from '../CustomLink/Link'
import SearchButton from '../SearchButton/SearchButton'
import ThemeSwitch from '../ThemeSwitch/ThemeSwitch'
import { Logo } from './Logo'
import MobileNav from './MobileNav'

const Header = () => {
  let headerClass =
    'flex items-center w-full  bg-white/95 dark:bg-gray-950 justify-between py-4 backdrop-blur-lg sticky top-0 z-50'
  if (siteMetadata.stickyNav) {
    headerClass += ' sticky top-0 z-50'
  }

  return (
    <header className={headerClass}>
      <Link href="/" aria-label={siteMetadata.headerTitle}>
        <div className="flex items-center justify-between">
          <div className="mr-3">
            <Logo />
          </div>
          <div className="hidden text-3xl font-semibold sm:block">{siteMetadata.headerTitle}</div>
        </div>
      </Link>
      <div className="flex items-center space-x-4 leading-5 sm:-mr-6 sm:space-x-6">
        <SearchButton />
        <div className="no-scrollbar hidden max-w-40 items-center gap-x-4 overflow-x-auto sm:flex md:max-w-72 lg:max-w-96">
          {headerNavLinks
            .filter((link) => link.href !== '/')
            .map((link) => (
              <Link
                key={link.title}
                href={link.href}
                className="hover:text-primary-500 dark:hover:text-primary-400 m-1 font-medium text-gray-900 dark:text-gray-100"
              >
                {link.title}
              </Link>
            ))}
        </div>

        <Link
          className="flex items-center justify-center gap-4 rounded-full bg-black px-4 py-2 text-white transition-colors duration-200 hover:bg-teal-500 focus:bg-teal-500 sm:px-6 sm:py-3 dark:bg-teal-500 dark:hover:bg-black dark:focus:bg-black"
          href="https://github.com/sanity-io/sanity-template-nextjs-clean"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="whitespace-nowrap">Visit my website</span>
        </Link>
        <ThemeSwitch />
        <MobileNav />
      </div>
    </header>
  )
}

export default Header
