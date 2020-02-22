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
            acf {
              background_image {
                id
              }
            }
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
            acf {
              featured_image {
                id
              }
            }
          }
        }
      }
    }
  `)
  //   const result = await graphql(`
  //     query {
  //       allWordpressPost {
  //         edges {
  //           node {
  //             id
  //             slug
  //           }
  //         }
  //       }
  //     }
  //   `)
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
  const postTemplate = path.resolve(`./src/templates/BlogPost.tsx`)
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
        id: edge.node.wordpress_id,
      },
    })
  })
}
