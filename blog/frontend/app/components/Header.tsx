import { sanityFetch } from "@/sanity/lib/live";
import { settingsQuery } from "@/sanity/lib/queries";
import Image from "next/image";
import Link from "next/link";

export default async function Header() {
  const { data: settings } = await sanityFetch({
    query: settingsQuery,
  });

  return (
    <header className="fixed z-50 h-24 inset-0 bg-white/80 flex items-center backdrop-blur-lg">
      <div className="container py-6 px-2 sm:px-6">
        <div className="flex items-center justify-between gap-5">
          <div className="flex gap-2">
            <Link className="flex items-center gap-2" href="/">
              <Image
                src="/images/clydedsouza.jpg"
                width={50}
                height={50}
                style={{ borderRadius: "100px" }}
                className="transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110"
                priority
                alt="Picture of the author"
              />

              <span className="text-lg sm:text-2xl pl-2 font-semibold">
                {settings?.title || "Clyde's Blog"}
              </span>
            </Link>
          </div>

          <nav>
            <ul
              role="list"
              className="flex items-center gap-4 md:gap-6 leading-5 text-xs sm:text-base tracking-tight font-mono"
            >
              <li>
                <Link href="/about" className="hover:underline">
                  About
                </Link>
              </li>
              <li>
                <Link href="/reading-list" className="hover:underline">
                  Reading List
                </Link>
              </li>
              <li>
                <Link href="/tags" className="hover:underline">
                  Topics
                </Link>
              </li>

              <li className="sm:before:w-[1px] sm:before:bg-gray-200 before:block flex sm:gap-4 md:gap-6">
                <Link
                  className="rounded-full flex gap-4 items-center bg-black hover:bg-teal-500 focus:bg-teal-500 py-2 px-4 justify-center sm:py-3 sm:px-6 text-white transition-colors duration-200"
                  href="https://github.com/sanity-io/sanity-template-nextjs-clean"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="whitespace-nowrap">Visit my website</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
