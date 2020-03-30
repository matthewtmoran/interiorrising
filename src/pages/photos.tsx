import React, { FunctionComponent } from "react"
import { graphql, useStaticQuery } from "gatsby"
import BlogPost from "../templates/blog-post"
import SEO from "../components/seo"
import Layout from "../components/layout"

interface IPhotos {}

const Photos: FunctionComponent<IPhotos> = ({}) => {
  const {
    data: { posts },
  } = useStaticQuery(pageQuery)

  return (
    <Layout>
      <SEO title={"Photos"} description={"Photographs I've taken"} />
      {posts.map(({ post }) => {
        return (
          <BlogPost
            title={post.title}
            content={post.content}
            date={post.date}
            excerpt={post.excerpt}
            image={post.acf.featured_media.localFile.childImageSharp}
          />
        )
      })}
    </Layout>
  )
}

const pageQuery = graphql`
  query {
    data: allWordpressPost(
      filter: { categories: { elemMatch: { name: { eq: "Photos" } } } }
    ) {
      posts: edges {
        post: node {
          id
          slug
          date
          title
          excerpt
          acf {
            featured_media {
              localFile {
                childImageSharp {
                  fluid(maxWidth: 900, quality: 90) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`
export default Photos
