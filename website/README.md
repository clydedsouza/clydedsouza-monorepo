# Website

## Local setup

Install the packages using npm. Then run `npm run dev` to start the project locally. This website is a Next.js site. You can run tests using `npm run test` and it is a mix of RTL and snapshot tests.

### API

This website fetches project data from an API `https://api.clydedsouza.net` which is just another site in GitHub pages. This project data has images hosted in `https://files.clydedsouza.net`. The API code is the in the `api` folder and the images are in the `images` folder - please see the readme in those folders for further instructions.

> When running the website locally or in any environment, it always pulls the API from the production URL.

### Environment variables

Secret environment variables should be in the `.env` file. Here `.env.production` isn't checked in. Env variables and secrets are also applied in CICD.

### Chatbot

This website features a chatbot using Tawk.to. This allows adding a live chat feature.

### Build

Production ready files are built in the `out` folder after running `npm run build`. This is also what happens in CICD although there it runs `npx --no-install next build`. The next build also runs linting so its best to check this locally before pushing up to the repo.

## CICD

### Environment variables

The environment variables and feature flags that exist in the .env file are also added to GitHub so CICD can use it. In GitHub repo, I've created an `environment` called `github-pages` and in that you should find all the `secrets and variables`.

### Automatic deployments

The website files are deployed from the `monorepo repo` to the `website repo` using GHA and authenticated using Deploy Keys.

#### Creating deploy keys

Go to Fork -> Click on Configure ssh keys -> Click on Generate new SSH keys -> Give the Key file a suitable name `clydedsouza.net website` and email `<github account email address>`. This will generate a public key that begins with `ssh-ed25519` and end up with the email address used.

#### Using deploy keys

##### Public key

Copy the public key from Fork to the Deploy keys page in the destination repo, i.e. the blog repo https://github.com/clydedsouza/clydedsouza.github.io. Once you add the deploy keys, the GitHub UI should show the same SHA value that should match with what's in Fork.

##### Private key

Fork should also show the location where the private key file is placed, which should on the local machine. This file begins with `-----BEGIN OPENSSH PRIVATE KEY-----` and ends with `-----END OPENSSH PRIVATE KEY-----`. Copy the contents of this file to the source repo, i.e. the monorepo https://github.com/clydedsouza/clydedsouza-monorepo. In this case, we'll add it as an Environment secret variable called `WEBSITE_REPO_DEPLOY_KEY`.

##### GHA

The `website.yml` file uses the GHA `tagus/git-deploy@v0.4.1` which uses the SSH key stored in the env secret variable `WEBSITE_REPO_DEPLOY_KEY` to deploy the blog files.
