export async function addSubscriber() {
  // in a client component
  const res = await fetch('/api/newsletter', {
    method: 'POST',
    body: JSON.stringify({ email: 'bob@gmail.com', first_name: 'Bob' }),
    headers: { 'Content-Type': 'application/json' },
  })
  console.log(res)
}
