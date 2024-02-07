/** @type {import("pliny/config").PlinyConfig } */
const siteMetadata = {
  title: "Marcel Blijleven's Blog",
  author: 'Marcel Blijleven',
  headerTitle: 'Marcel Blijleven',
  description: 'My personal blog',
  language: 'en-us',
  theme: 'system',
  siteUrl: 'https://www.marcelblijleven.com',
  siteRepo: 'https://github.com/marcelblijleven/marcelblijleven.com',
  siteLogo: '/static/images/logo.png',
  socialBanner: '/static/images/twitter-card.png',
  github: 'https://github.com/marcelblijleven',
  linkedin: 'https://www.linkedin.com/in/marcelblijleven',
  locale: 'en-US',
  analytics: {
    umamiAnalytics: {
      umamiWebsiteId: process.env.NEXT_UMAMI_ID,
    },
  },
  search: {
    provider: 'kbar',
    kbarConfig: {
      searchDocumentsPath: 'search.json',
    },
  },
}

module.exports = siteMetadata
