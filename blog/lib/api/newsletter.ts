export interface INewsletterPayload {
  firstName: string
  email: string
}

export async function addSubscriber({ firstName, email }: INewsletterPayload) {
  return await fetch('/api/newsletter', {
    method: 'POST',
    body: JSON.stringify({ email, firstName }),
    headers: { 'Content-Type': 'application/json' },
  })
}
