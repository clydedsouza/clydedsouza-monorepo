# Blog

## Local setup

Install the packages using npm. Then run `npm run dev` to start the project locally.

This website is a Next.js Tailwind CSS static blog created using [this template](https://github.com/timlrx/tailwind-nextjs-starter-blog). It supports writing blog posts as MDX files, then it will compiles the site and the blog posts into a static website, and then deploy them to GitHub Pages. All features in the website like blog search, tags, reading lists are all statically generated.

You can add/update blog post files located in the `data\posts` folder.

### Frontmatter

Ensure that the frontmatter content structure is the same as other blog posts. We can add a new frontmatter key but for that we have to update the `contentlayer.config.ts` file and other places to use this new key. For existing keys, it should just work across files. You can lint the frontmatter content locally using `npm run lint:frontmatter`.

### MDX

MDX files supports React components inline. I've used this to embed YouTube, inline images, inline ads, etc. A full list of custom MDX components can be found here `components\MDXComponents.tsx`. Pick a component from this file and search its references in the MDX files.

### Images

The blog posts stores its images in the same repo īn the `public\static\posts` folder. This includes the featured image and inline images.

To compress images locally, you can run `npm run optimize:post-images` and to compress general blog website images, you can run `npm run optimize:site-images`.

Image compress also happens in CICD in the `blog.yml` file.

### Environment variables and feature flags

Secret environment variables should be in the `.env` file. Use the `.env.example` file to recreate the `.env` file if downloading the repo for the first time. These env variables are also applied in CICD, more about it below.

I've also added some feature flags like `NEXT_PUBLIC_IS_COMMENTS_ENABLED` that control the features across the website. E.g. if the comments don't work as expected, I can update the flag value to false and re-run CICD which should build the site with the false value and hide the feature.

### Build

Production ready files are built in the `out` folder after running `npm run build:production`. This is also what happens in CICD. The next build also runs linting so its best to check this locally before pushing up to the repo.

## CICD

### Environment variables and feature flags

The environment variables and feature flags that exist in the .env file are also added to GitHub so CICD can use it. In GitHub repo, I've created an `environment` called `blog` and in that you should find all the `secrets and variables`.

### Automatic deployments

The website files are deployed from the `monorepo repo` to the `blog repo` using GHA and authenticated using Deploy Keys.

#### Creating deploy keys

Go to Fork -> Click on Configure ssh keys -> Click on Generate new SSH keys -> Give the Key file a suitable name `clydedsouza.net blog` and email `<github account email address>`. This will generate a public key that begins with `ssh-ed25519` and end up with the email address used.

#### Using deploy keys

##### Public key

Copy the public key from Fork to the Deploy keys page in the destination repo, i.e. the blog repo https://github.com/clydedsouza/clydedsouza-web-blog. Once you add the deploy keys, the GitHub UI should show the same SHA value that should match with what's in Fork.

##### Private key

Fork should also show the location where the private key file is placed, which should on the local machine. This file begins with `-----BEGIN OPENSSH PRIVATE KEY-----` and ends with `-----END OPENSSH PRIVATE KEY-----`. Copy the contents of this file to the source repo, i.e. the monorepo https://github.com/clydedsouza/clydedsouza-monorepo. In this case, we'll add it as an Environment secret variable called `BLOG_REPO_DEPLOY_KEY`.

##### GHA

The `blog.yml` file uses the GHA `tagus/git-deploy@v0.4.1` which uses the SSH key stored in the env secret variable `BLOG_REPO_DEPLOY_KEY` to deploy the blog files.

### Image compression

Images are also compressed in CICD using the GHA `ClydeDz/compress-images@v1`. This is exactly what's been done in the `image.yml` file.
