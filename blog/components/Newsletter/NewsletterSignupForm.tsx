'use client'

import { addSubscriber } from 'lib/api/newsletter'

export const NewsletterSignupForm = ({ isFullWidth = false }: { isFullWidth?: boolean }) => {
  const subtitle = isFullWidth
    ? 'Nostrud amet eu ullamco nisi aute in ad minim nostrud adipisicing velit quis. Duistempor incididunt dolore.'
    : 'sscsc'

  const handleSubmit = async () => {
    await addSubscriber()
  }

  return (
    <div
      className={`relative isolate overflow-hidden bg-teal-900 py-8 sm:py-16 ${isFullWidth ? 'lg:py-16' : 'lg:py-8'}`}
    >
      <div className="mx-auto flex max-w-7xl justify-center px-6 lg:px-2">
        <div className="max-w-xl text-center lg:max-w-xl">
          <h2
            className={`${isFullWidth ? 'text-4xl' : 'text-xl'} font-semibold tracking-tight text-white`}
          >
            Subscribe to my newsletter
          </h2>
          <p className={`${isFullWidth ? 'text-lg' : 'text-base'} mt-4 text-gray-300`}>
            {subtitle}
          </p>
          <div className="mt-6 flex max-w-xl gap-x-4">
            <label htmlFor="first-name" className="sr-only">
              First name
            </label>
            <input
              id="first-name"
              name="firstName"
              type="text"
              required
              placeholder="Enter your first name"
              autoComplete="First name"
              className="min-w-0 flex-auto rounded-md bg-white/5 px-3.5 py-2 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
            />
          </div>
          <div className="mt-6 flex max-w-xl gap-x-4">
            <label htmlFor="email-address" className="sr-only">
              Email address
            </label>
            <input
              id="email-address"
              name="email"
              type="email"
              required
              placeholder="Enter your email"
              autoComplete="email"
              className="min-w-0 flex-auto rounded-md bg-white/5 px-3.5 py-2 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
            />
          </div>
          <div className="mt-6 flex max-w-xl items-center justify-center gap-x-4">
            <button
              type="submit"
              onClick={handleSubmit}
              className="flex-none cursor-pointer rounded-md bg-teal-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-teal-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
