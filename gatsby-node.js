const path = require(`path`)
const slash = require(`slash`)
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  // query content for WordPress posts
  const result = await graphql(`
    {
      allWordpressPage {
        edges {
          node {
            id
            slug
            status
            template
          }
        }
      }
      allWordpressPost {
        edges {
          node {
            id
            slug
            status
            template
            format
            date
            excerpt
            title
          }
        }
      }
    }
  `)
  const pageTemplate = path.resolve(`./src/templates/page.js`)
  result.data.allWordpressPage.edges.forEach(edge => {
    createPage({
      path: edge.node.slug,
      component: slash(pageTemplate),
      context: {
        id: edge.node.id,
      },
    })
  })
  const postTemplate = path.resolve(`./src/templates/individual-post.tsx`)
  result.data.allWordpressPost.edges.forEach(edge => {
    createPage({
      // will be the url for the page
      path: edge.node.slug,
      // specify the component template of your choice
      component: postTemplate,
      // component: slash(postTemplate),
      // In the ^template's GraphQL query, 'id' will be available
      // as a GraphQL variable to query for this posts's data.
      context: {
        id: edge.node.id,
      },
    })
  })
  // Replacing '/' would result in empty string which is invalid
  const replacePath = path => (path === `/` ? path : path.replace(/\/$/, ``))
  // Implement the Gatsby API “onCreatePage”. This is
  // called after every page is created.
  exports.onCreatePage = ({ page, actions }) => {
    const { createPage, deletePage } = actions

    const oldPage = Object.assign({}, page)
    // Remove trailing slash unless page is /
    page.path = replacePath(page.path)
    if (page.path !== oldPage.path) {
      // Replace new page with old page
      deletePage(oldPage)
      createPage(page)
    }
  }
}
