# clydedsouza-monorepo

[![All websites monitoring status by Instatus - Dynamic JSON Badge](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fclydedsouza.instatus.com%2Fsummary.json&query=%24.page.status&label=All%20websites%20monitoring%20status%20-%20Instatus&color=009688)](https://clydedsouza.instatus.com/)

This monorepo contains source code for the following websites:

- https://clydedsouza.net
- https://blog.clydedsouza.net
- https://api.clydedsouza.net
- https://files.clydedsouza.net

Each folder has a README that has documentation on how to set up and run the folder contents. The `.github` folder contains GHA to build and deploy each site. `.vscode` folder contains VS Code specific optional settings.

Additionally, the following services are used and configured:

- Cloudflare for domain, SSL, DNS, and serverless computing i.e. Workers
- GitHub for git and GitHub Pages for website hosting
- ZOHO for emails
- Tawk.to for chatbot
- Instatus for status page
- Freshping for uptime monitor
- Mixpanel for web analytics
- Netlify for site previews, useful when previewing PR changes
- ConvertKit for newsletters

Addition websites not in this repo:

- https://sponsor.clydedsouza.net
- https://links.clydedsouza.net
- https://mamatellmeastory.clydedsouza.net
- https://aitellmeastory.clydedsouza.net
