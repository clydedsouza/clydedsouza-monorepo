# Images

## Local setup

There is no local set up as such other than having this folder in the workspace. Images are added to the respective folders where each folder represents the website page (or a vertical). In CICD, the images are compressed (more about it below).

### Adding new folders

You can add new folders with images in it, but you'll also need to modify the CICD file `images.yml` so the contents of this newly added folder is compressed. Follow the pattern for existing folders and replicate it accordingly.

## CICD

### Image compression

CICD uses the GHA `ClydeDz/compress-images@v1` to compress the images. Each folder is compressed individually and copied across to the public folder which is deployed to production.

### Automatic deployments

The website files are deployed from the `monorepo repo` to the `files repo` using GHA and authenticated using Deploy Keys.

#### Creating deploy keys

Go to Fork -> Click on Configure ssh keys -> Click on Generate new SSH keys -> Give the Key file a suitable name `clydedsouza.net images` and email `<github account email address>`. This will generate a public key that begins with `ssh-ed25519` and end up with the email address used.

#### Using deploy keys

##### Public key

Copy the public key from Fork to the Deploy keys page in the destination repo, i.e. the files/images repo https://github.com/clydedsouza/clydedsouza-web-files. Once you add the deploy keys, the GitHub UI should show the same SHA value that should match with what's in Fork.

##### Private key

Fork should also show the location where the private key file is placed, which should on the local machine. This file begins with `-----BEGIN OPENSSH PRIVATE KEY-----` and ends with `-----END OPENSSH PRIVATE KEY-----`. Copy the contents of this file to the source repo, i.e. the monorepo https://github.com/clydedsouza/clydedsouza-monorepo. In this case, we'll add it as an Environment secret variable called `IMAGES_REPO_DEPLOY_KEY`.

##### GHA

The `images.yml` file uses the GHA `tagus/git-deploy@v0.4.1` which uses the SSH key stored in the env secret variable `IMAGES_REPO_DEPLOY_KEY` to deploy the blog files.
