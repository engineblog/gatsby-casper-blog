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
    'gatsby-plugin-typescript',
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
    {
      resolve: 'gatsby-plugin-mailchimp',
      options: {
        endpoint: '<form action="https://tech.us4.list-manage.com/subscribe/post-json?u=6684049818e4c7bdf80720cfd&amp;id=f3e592b4ba" method="get" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_blank" novalidate>',
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
          src: '/logos/train-black-48x48.png',
          sizes: '48x48',
          type: 'image/png',
        },
        {
          src: '/logos/train-black-72x72.png',
          sizes: '72x72',
          type: 'image/png',
        },
        {
          src: '/logos/train-black-96x96.png',
          sizes: '96x96',
          type: 'image/png',
        },
        {
          src: '/logos/train-black-144x144.png',
          sizes: '144x144',
          type: 'image/png',
        },
        {
          src: '/logos/train-black-192x192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: '/logos/train-black-256x256.png',
          sizes: '256x256',
          type: 'image/png',
        },
        {
          src: '/logos/train-black-384x384.png',
          sizes: '384x384',
          type: 'image/png',
        },
        {
          src: '/logos/train-black-512x512.png',
          sizes: '512x512',
          type: 'image/png',
        },
        ],
      },
    },
    'gatsby-plugin-offline',
  ],
};
