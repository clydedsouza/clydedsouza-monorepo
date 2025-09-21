import { createSubscriber } from './helper';
import { INewsletter } from './types';

export default {
	async fetch(request, env, ctx): Promise<Response> {
		if (request.method === 'OPTIONS') {
			return new Response(null, {
				headers: {
					'Access-Control-Allow-Origin': env.CORS_ALLOW_ORIGINS,
					'Access-Control-Allow-Methods': 'POST, OPTIONS',
					'Access-Control-Allow-Headers': 'Content-Type',
				},
			});
		}

		const incomingOrigin = request.headers.get('Origin');

		if (incomingOrigin && incomingOrigin !== env.CORS_ALLOW_ORIGINS) {
			return new Response(JSON.stringify({ message: 'Forbidden' }), {
				status: 403,
				headers: {
					'Content-Type': 'application/json',
				},
			});
		}

		if (request.method !== 'POST') {
			return new Response(JSON.stringify({ message: 'Method not allowed' }), {
				status: 405,
				headers: {
					'Content-Type': 'application/json',
					'Access-Control-Allow-Origin': env.CORS_ALLOW_ORIGINS,
				},
			});
		}

		const textBody = await request.text();
		const person = JSON.parse(textBody) as INewsletter;

		const response = await createSubscriber({ email: person.email, name: person.name, env });

		if (!response) {
			return new Response(JSON.stringify({ message: "Subscriber couldn't be added to the newsletter" }), {
				status: 500,
				headers: {
					'Content-Type': 'application/json',
					'Access-Control-Allow-Origin': env.CORS_ALLOW_ORIGINS,
				},
			});
		}

		return new Response(JSON.stringify({ message: 'Subscriber  added to the newsletter' }), {
			status: 200,
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': env.CORS_ALLOW_ORIGINS,
			},
		});
	},
} satisfies ExportedHandler<Env>;
