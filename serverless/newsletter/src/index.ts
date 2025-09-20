import { createSubscriber } from './helper';
import { INewsletter } from './types';

export default {
	async fetch(request, env, ctx): Promise<Response> {
		if (request.method !== 'POST') {
			return new Response(JSON.stringify({ message: 'Method not allowed' }), { status: 405 });
		}

		const textBody = await request.text();
		const person = JSON.parse(textBody) as INewsletter;

		const response = await createSubscriber({ email: person.email, name: person.name, env });

		if (!response) {
			return new Response(JSON.stringify({ message: "Subscriber couldn't be added to the newsletter" }), {
				status: 500,
				headers: { 'Content-Type': 'application/json' },
			});
		}

		return new Response(JSON.stringify({ message: 'Subscriber  added to the newsletter' }), {
			status: 200,
			headers: { 'Content-Type': 'application/json' },
		});
	},
} satisfies ExportedHandler<Env>;
