# Serverless

## Newsletter

This is a Cloudflare Worker — a serverless API that accepts subscriber information from the blogging site and integrates with Convertkit to create a new subscriber via the Convertkit API.

### Local setup

Worker code is in the `src` folder. Its a basic typescript code that accepts a POST request made to it, gets the subscriber name and email and then makes the API calls to the Convertkit API to create a subscriber and add it to the newsletter form.

To run this locally, install the packages and then execute `npm run start`. In the console, you should see a URL of the locally running Worker which you can use to test.

The start command also runs `generate-types` which updates the `worker-configuration.d.ts` file. For e.g. if you update the `.env` file with secrets, the same keys will be added to the types file.

#### Testing

A node script is created in the `newsletter/test` folder which makes a request to the locally running Cloudflare Worker.

#### Build

There is no need to compile typescript into javascript of build any part of the code. The wrangler commands do it all for us.

### CICD

#### GHA

The `serverless-newsletter.yml` file uses the official action `cloudflare/wrangler-action@v3.14.1` to deploy the Worker into Cloudflare. We're explicitly setting the `wranglerVersion` to `4.38.0` because the default version of the wrangler action uses an older version of wrangler CLI and doesn't support new features.

One job runs only on a PR and does a dry run of the build and deployment. The other one runs only in main that builds and actually deploys to Cloudflare.

##### Alternative

The other option I was contemplating was to use version. We can deploy a new version of the Cloudflare Worker and keep it in the dark till we're ready to send traffic to the new version.

The command `wrangler versions upload` deploys the Worker to Cloudflare and gives the version ID in GUID format. We can then run `wrangler versions deploy --version-id=GUID --yes` to deploy/release this version for production traffic.

I was thinking that in a PR, GHA could only do a version upload, and in the main branch, it can do a version upload and also deploy the specific version.

#### Environment variables

The environment variables that exist in the `.env` file are also added to GitHub so CICD can use it. In GitHub repo, I've created an `environment` called `newsletter` and in that you should find all the `secrets and variables`.
