'use client'

import { addSubscriber } from 'lib/api/newsletter'
import { useEffect, useState } from 'react'

const validateEmail = (email: string) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
}

export const NewsletterSignupForm = ({ isFullWidth = false }: { isFullWidth?: boolean }) => {
  const [firstName, setFirstName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [isFirstNameValid, setIsFirstNameValid] = useState<boolean>(false)
  const [isEmailValid, setIsEmailValid] = useState<boolean>(false)
  const [isSignedUp, setIsSignedUp] = useState<boolean>(false)

  const handleSubmit = async () => {
    const response = await addSubscriber({ firstName, email })
    response.ok ? setIsSignedUp(true) : setIsSignedUp(false)
  }

  useEffect(() => {
    validateEmail(email) ? setIsEmailValid(true) : setIsEmailValid(false)
  }, [email])

  useEffect(() => {
    firstName && firstName.length > 3 ? setIsFirstNameValid(true) : setIsFirstNameValid(false)
  }, [firstName])

  if (isSignedUp) {
    return (
      <div
        className={`bg-primary-500 relative isolate overflow-hidden py-8 sm:py-16 ${isFullWidth ? 'px-8 md:px-8 lg:py-16' : 'my-4 min-h-[331px] px-4 lg:py-4'}`}
      >
        <h2
          className={`${isFullWidth ? 'text-2xl font-bold md:text-3xl lg:text-4xl' : 'text-xl font-semibold'} tracking-tight text-white dark:text-slate-50`}
        >
          Thanks for signing up to my newsletter.
        </h2>
        <p
          className={`${isFullWidth ? 'text-lg md:text-xl lg:text-xl' : 'text-base'} mt-4 text-white`}
        >
          I'll be in touch! 💌
        </p>
      </div>
    )
  }

  return (
    <div
      className={`bg-primary-500 relative isolate overflow-hidden py-8 sm:py-16 ${isFullWidth ? 'px-2 sm:px-6 lg:py-10' : 'my-5 px-4 lg:py-4'}`}
    >
      <div className="mx-auto max-w-7xl">
        <h2
          className={`${isFullWidth ? 'text-2xl font-bold md:text-3xl lg:text-4xl' : 'text-xl font-semibold'} tracking-tight text-white dark:text-slate-50`}
        >
          Subscribe to my newsletter
        </h2>
        <p
          className={`${isFullWidth ? 'text-lg md:text-xl lg:text-xl' : 'text-base'} mt-4 text-white`}
        >
          Get a freebie for signing up to my newsletter. Receive infrequent emails from me
          thereafter.
        </p>
        <div
          className={`mt-6 flex ${isFullWidth ? 'w-[80%] flex-col items-center justify-center gap-x-4 gap-y-4 sm:flex-row' : 'w-full flex-col items-center gap-y-4'}`}
        >
          <label htmlFor="first-name" className="sr-only">
            First name
          </label>
          <input
            id="first-name"
            name="firstName"
            type="text"
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Enter your first name"
            autoComplete="First name"
            aria-invalid={!isFirstNameValid}
            className="w-full rounded-full border-white/50 bg-white/9 px-3.5 py-2 text-white placeholder:text-white focus:outline-2 focus:outline-white aria-invalid:outline-red-500 sm:text-sm/6 md:text-base lg:text-base"
          />
          <label htmlFor="email-address" className="sr-only">
            Email address
          </label>
          <input
            id="email-address"
            name="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            autoComplete="email"
            aria-invalid={!isEmailValid}
            className="w-full rounded-full border-white/50 bg-white/9 px-3.5 py-2 text-white placeholder:text-white focus:outline-2 focus:outline-white aria-invalid:outline-red-500 sm:text-sm/6 md:text-base lg:text-base"
          />
          <button
            type="submit"
            onClick={handleSubmit}
            disabled={!isFirstNameValid || !isEmailValid}
            className="text-primary-500 hover:text-primary-500 w-full cursor-pointer rounded-full bg-white px-3.5 py-2.5 font-bold shadow-xs hover:bg-white/90 focus-visible:outline-2 focus-visible:outline-white disabled:cursor-not-allowed disabled:bg-white/90"
          >
            Subscribe
          </button>
        </div>
      </div>
    </div>
  )
}
