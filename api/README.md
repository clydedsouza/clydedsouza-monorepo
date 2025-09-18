# API

## Local setup

Install the packages using npm. Then run `npm run generate:api` to produce the API JSON files. This is a static API implementation, i.e. there's no database. The data for the API comes from markdown files which is then converted to JSON files and is served to the website via the API URL.

The `src` folder contains subfolders which hosts different markdown files, each representing one item in the API. The subfolder represents the website page (or a vertical).

The settings file contains config settings in order for the `markdown-json` library to convert the markdown files into JSON. The converted JSON files are stored in the `public` folder which is then deployed to production.

### Adding new markdown files

If you're adding new markdown files into existing folders, local build and CICD should automatically pick this up and include it in the produced JSON file. For example, adding a new "project".

If you're adding a new folder, you'll need to replicate structure and settings that's applied to the existing folders. This includes:

- Adding a new settings JSON file
- Adding a new script to package.json
- Updating the existing generate:api script to run the newly added script

## CICD

### Automatic deployments

The website files are deployed from the `monorepo repo` to the `api repo` using GHA and authenticated using Deploy Keys.

#### Creating deploy keys

Go to Fork -> Click on Configure ssh keys -> Click on Generate new SSH keys -> Give the Key file a suitable name `clydedsouza.net api` and email `<github account email address>`. This will generate a public key that begins with `ssh-ed25519` and end up with the email address used.

#### Using deploy keys

##### Public key

Copy the public key from Fork to the Deploy keys page in the destination repo, i.e. the api repo https://github.com/clydedsouza/clydedsouza-web-api. Once you add the deploy keys, the GitHub UI should show the same SHA value that should match with what's in Fork.

##### Private key

Fork should also show the location where the private key file is placed, which should on the local machine. This file begins with `-----BEGIN OPENSSH PRIVATE KEY-----` and ends with `-----END OPENSSH PRIVATE KEY-----`. Copy the contents of this file to the source repo, i.e. the monorepo https://github.com/clydedsouza/clydedsouza-monorepo. In this case, we'll add it as an Environment secret variable called `API_REPO_DEPLOY_KEY`.

##### GHA

The `api.yml` file uses the GHA `tagus/git-deploy@v0.4.1` which uses the SSH key stored in the env secret variable `API_REPO_DEPLOY_KEY` to deploy the blog files.
