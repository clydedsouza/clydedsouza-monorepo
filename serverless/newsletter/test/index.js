// Run this locally to test worker
// node ./index.js

const testLocal = true;

const url = testLocal ? 'http://127.0.0.1:8787/' : 'https://newsletter.clydedz.workers.dev/';

const postData = {
	name: 'John Doe',
	email: 'john.doe@example.com',
};

fetch(url, {
	method: 'POST',
	headers: {
		'Content-Type': 'application/json',
	},
	body: JSON.stringify(postData),
})
	.then((response) => {
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		return response.json();
	})
	.then((data) => {
		console.log('Success:', data);
	})
	.catch((error) => {
		console.error('Error:', error);
	});
