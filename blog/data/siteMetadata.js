/** @type {import("pliny/config").PlinyConfig } */
const siteMetadata = {
  title: "Clyde's Blog",
  author: "Clyde D'Souza",
  authorUrl: 'https://clydedsouza.net',
  headerTitle: "Clyde's Blog",
  description: 'Read the latest articles by Clyde, a software engineer and digital content creator.',
  language: 'en-us',
  locale: 'en-US',
  theme: 'system',
  siteUrl: `${process.env.NODE_ENV === 'production' ? 'https://blog.clydedsouza.net' : 'http://localhost:3000'}`,
  siteRepo: 'https://github.com/clydedsouza/clydedsouza-monorepo',
  siteLogo: `${process.env.BASE_PATH || ''}/static/images/logo.png`,
  socialBanner: `${process.env.BASE_PATH || ''}/static/images/teaser.png`,
  email: 'clyde@clydedsouza.net',
  github: 'https://github.com/ClydeDz',
  x: 'https://twitter.com/clydedz',
  youtube: 'https://www.youtube.com/@clydedz',
  linkedin: 'https://www.linkedin.com/in/clydedz/',
  analytics: {
    // Without this empty block, npm build doesn't work
    simpleAnalytics: {},
  },
  comments: {
    provider: 'giscus',
    giscusConfig: {
      repo: process.env.NEXT_PUBLIC_GISCUS_REPO,
      repositoryId: process.env.NEXT_PUBLIC_GISCUS_REPOSITORY_ID,
      category: process.env.NEXT_PUBLIC_GISCUS_CATEGORY,
      categoryId: process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID,
      mapping: 'title',
      reactions: '1',
      metadata: '0',
      theme: 'light', // or preferred_color_scheme if we want to switch themes
      darkTheme: 'transparent_dark',
      themeURL: '',
      lang: 'en',
      inputPosition: 'top',
    },
  },
  search: {
    provider: 'kbar',
    kbarConfig: {
      searchDocumentsPath: `${process.env.BASE_PATH || ''}/search.json`,
    },
  },
}

module.exports = siteMetadata
