const config = require('./data/SiteConfig');

const pathPrefix = config.pathPrefix === '/' ? '' : config.pathPrefix;

module.exports = {
  pathPrefix: config.pathPrefix,
  siteMetadata: {
    siteUrl: config.siteUrl + pathPrefix,
    rssMetadata: {
      site_url: config.siteUrl + pathPrefix,
      feed_url: config.siteUrl + pathPrefix + config.siteRss,
      title: config.siteTitle,
      description: config.siteDescription,
      image_url: `${config.siteUrl + pathPrefix}/logos/logo-512.png`,
      author: config.siteRssAuthor,
      copyright: `${config.copyright.label} © ${config.copyright.year ||
        new Date().getFullYear()}`,
    },
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'posts',
        path: `${__dirname}/content/${config.blogPostDir}`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'authors',
        path: `${__dirname}/content/${config.blogAuthorDir}`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'resources',
        path: `${__dirname}/content/${config.resourceDir}`,
      },
    },
    'gatsby-transformer-json',
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        excerpt_separator: `<!-- end -->`,
        plugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 710,
            },
          },
          {
            resolve: 'gatsby-remark-responsive-iframe',
          },
          {
            resolve: `gatsby-remark-vscode`,
            options: {
              theme: 'Tomorrow Night Blue',
            },
          },

          'gatsby-remark-external-links',
          'gatsby-remark-prismjs',
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-autolink-headers',
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: config.googleAnalyticsID,
        anonymize: true,
        respectDNT: true,
      },
    },
    {
      resolve: 'gatsby-plugin-nprogress',
      options: {
        color: config.themeColor,
      },
    },
    'gatsby-plugin-sharp',
    'gatsby-plugin-catch-links',
    'gatsby-plugin-twitter',
    'gatsby-plugin-sitemap',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: config.siteTitle,
        short_name: config.siteTitle,
        description: config.siteDescription,
        start_url: config.pathPrefix,
        background_color: config.backgroundColor,
        theme_color: config.themeColor,
        display: 'minimal-ui',
        icons: [
          {
            src: '/logos/logo-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/logos/logo-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    },
    'gatsby-plugin-offline',
  ],
};
