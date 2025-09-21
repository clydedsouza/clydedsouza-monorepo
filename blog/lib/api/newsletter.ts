interface INewsletterPayload {
  firstName: string
  email: string
}

export async function addSubscriber({ firstName, email }: INewsletterPayload) {
  const newsletterApiUrl = process.env.NEXT_PUBLIC_NEWSLETTER_API_URL ?? 'http://127.0.0.1:8787/'

  return await fetch(newsletterApiUrl, {
    method: 'POST',
    body: JSON.stringify({ name: firstName, email }),
    headers: { 'Content-Type': 'application/json' },
  })
}
