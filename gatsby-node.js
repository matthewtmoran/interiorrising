const path = require(`path`)
const slash = require(`slash`)
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const pageTemplate = path.resolve(`./src/templates/page.js`)
  const photoPostTemplate = path.resolve(
    `./src/templates/photo-post-template.tsx`
  )

  const result = await graphql(`
    {
      allWordpressPage {
        edges {
          node {
            id
            slug
          }
        }
      }
      allWordpressPost {
        edges {
          node {
            id
            slug
          }
        }
      }
    }
  `)

  if (result.errors) {
    throw result.errors
  }

  result.data.allWordpressPage.edges.forEach(edge => {
    createPage({
      path: edge.node.slug,
      component: slash(pageTemplate),
      context: {
        id: edge.node.id,
      },
    })
  })
  result.data.allWordpressPost.edges.forEach(edge => {
    createPage({
      // will be the url for the page
      path: edge.node.slug,
      // specify the component template of your choice
      component: photoPostTemplate,
      // In the ^template's GraphQL query, 'id' will be available
      // as a GraphQL variable to query for this posts's data.
      context: {
        id: edge.node.id,
      },
    })
  })
}
