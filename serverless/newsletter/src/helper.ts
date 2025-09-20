import { INewsletter } from './types';

const addSubscriberToForm = async (subscriberId: string, env: Env) => {
	const url = `https://api.kit.com/v4/forms/${env.CONVERTKIT_FORM_ID}/subscribers/${subscriberId}`;
	const options = {
		method: 'POST',
		headers: { 'X-Kit-Api-Key': `${env.CONVERTKIT_API_KEY}`, 'Content-Type': 'application/json' },
		body: '{"referrer":"blog"}',
	};

	return await fetch(url, options);
};

export const createSubscriber = async ({ email, name, env }: INewsletter) => {
	const url = 'https://api.kit.com/v4/subscribers';
	const options = {
		method: 'POST',
		headers: { 'X-Kit-Api-Key': `${env.CONVERTKIT_API_KEY}`, 'Content-Type': 'application/json' },
		body: JSON.stringify({
			first_name: name,
			email_address: email,
			state: 'active',
			fields: { source: 'blog' },
		}),
	};

	try {
		const createSubscriberResponse = await fetch(url, options);

		if (!createSubscriberResponse.ok) return false;

		const data = await createSubscriberResponse.json();

		// @ts-expect-error Type not explicitly defined for data variable
		const subscriberId = data.subscriber.id;

		const addSubscriberToFormResponse = await addSubscriberToForm(subscriberId, env);

		return addSubscriberToFormResponse.ok;
	} catch (error) {
		console.error(error);
		return false;
	}
};
