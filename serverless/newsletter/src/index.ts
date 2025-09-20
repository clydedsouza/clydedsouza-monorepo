interface INewsletter {
	name: string;
	email: string
}

export default {
	async fetch(request, env, ctx): Promise<Response> {
		if (request.method === 'POST') {
          	const textBody = await request.text();
          	console.log('Received Text:', textBody);
			const person = JSON.parse(textBody) as INewsletter;
			console.log(person.email,  person.name)
          	return new Response(`{"status": "OK", "subscriber": "${person.email}"}`);
        }
        return new Response('Method Not Allowed', { status: 405 });
	},
} satisfies ExportedHandler<Env>;
