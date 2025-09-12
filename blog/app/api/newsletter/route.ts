import { INewsletterPayload } from 'lib/api/newsletter'

export const dynamic = 'force-static' //'force-dynamic'

const formId = process.env.CONVERTKIT_FORM_ID
const apiKey = process.env.CONVERTKIT_API_KEY

async function addSubscriberToForm(subscriberId: string) {
  const url = `https://api.kit.com/v4/forms/${formId}/subscribers/${subscriberId}`
  const options = {
    method: 'POST',
    headers: { 'X-Kit-Api-Key': `${apiKey}`, 'Content-Type': 'application/json' },
    body: '{"referrer":"blog"}',
  }

  return await fetch(url, options)
}

async function createSubscriber({ email, firstName }: INewsletterPayload) {
  const url = 'https://api.kit.com/v4/subscribers'
  const options = {
    method: 'POST',
    headers: { 'X-Kit-Api-Key': `${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      first_name: firstName,
      email_address: email,
      state: 'active',
      fields: { source: 'blog' },
    }),
  }

  try {
    const createSubscriberResponse = await fetch(url, options)

    if (!createSubscriberResponse.ok) return false

    const data = await createSubscriberResponse.json()
    const subscriberId = data.subscriber.id

    const addSubscriberToFormResponse = await addSubscriberToForm(subscriberId)
    if (!addSubscriberToFormResponse.ok) return false

    return true
  } catch (error) {
    console.error(error)
    return false
  }
}

export async function POST(req: Request) {
  const { email, firstName } = await req.json()

  const response = await createSubscriber({ email, firstName })

  if (!response) {
    return new Response(
      JSON.stringify({ message: "Subscriber couldn't be added to the newsletter" }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    )
  }

  return new Response(JSON.stringify({ message: 'Subscriber  added to the newsletter' }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  })
}
