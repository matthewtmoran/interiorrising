const path = require(`path`)
const slash = require(`slash`)
const PHOTOS = "Photos"
const TEXT = "Text"

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const pageTemplate = path.resolve(`./src/templates/page.js`)
  const photoPostTemplate = path.resolve(
    `./src/templates/photo-post-template.tsx`
  )
  const textPostTemplate = path.resolve(
    `./src/templates/text-post-template.tsx`
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
            categories {
              name
            }
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
    const { node } = edge
    createPage({
      // will be the url for the page
      path: node.slug,
      // specify the component template of your choice
      component: node.categories.some(({ name }) => name === PHOTOS)
        ? photoPostTemplate
        : textPostTemplate,
      // In the ^template's GraphQL query, 'id' will be available
      // as a GraphQL variable to query for this posts's data.
      context: {
        id: node.id,
      },
    })
  })
}
