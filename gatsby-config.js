const environment =
  process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || "development"

require("dotenv").config({ path: `.env.${environment}` })

module.exports = {
  siteMetadata: {
    title: `Jill The Human`,
    description: `Jillian's site for enneagram coaching, photography, and writings.`,
    author: `Jillian Moran`,
    siteUrl: process.env.GATSBY_SITE_URL,
    headerLinks: [
      { name: "Home", to: "/" },
      { name: "Enneagram", to: "/enneagram" },
      { name: "Blog", to: "/blog" },
      { name: "Contact", to: "/contact" },
    ],
    socialNetworks: {
      instagram: process.env.GATSBY_INSTAGRAM_ACCOUNT,
    },
  },
  plugins: [
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-emotion`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-typescript`,
    `gatsby-plugin-react-helmet`,
    `@bumped-inc/gatsby-plugin-optional-chaining`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-source-wordpress`,
      options: {
        baseUrl: process.env.GATSBY_BASE_URL,
        protocol: `https`,
        hostingWPCOM: false,
        useACF: true,
        verbose: true,
        includedRoutes: [
          "**/categories",
          "**/posts",
          "**/pages",
          "**/media",
          "**/tags",
          "**/taxonomies",
          "**/users",
        ],
        excludedRoutes: [],
        normalizer: function({ entities }) {
          return entities
        },
      },
    },
    {
      resolve: "gatsby-plugin-webpack-bundle-analyzer",
      options: {
        production: true,
        disable: !process.env.ANALYZE_BUNDLE_SIZE,
        generateStatsFile: true,
        analyzerMode: "static",
      },
    },
    `gatsby-plugin-recaptcha`,
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [
          `Roboto Condensed`,

          // `source sans pro\:300,400,400i,700`, // you can also specify font weights and styles
        ],
        display: "swap",
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
