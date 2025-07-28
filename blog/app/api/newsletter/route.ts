export const dynamic = 'force-dynamic' //was force-static

export async function POST(req: Request) {
  const { email, first_name } = await req.json()
  console.log('Received request to add subscriber to newsletter', email, first_name)
  return new Response(JSON.stringify({ message: 'Newsletter route is active' }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  })
  // const { email } = await req.json()

  // const kitRes = await fetch('https://api.kit.co/subscribe', {
  //   method: 'POST',
  //   headers: {
  //     Authorization: `Bearer ${process.env.KIT_API_KEY}`,
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({ email }),
  // })

  // const result = await kitRes.json()
  // return Response.json(result)
}
