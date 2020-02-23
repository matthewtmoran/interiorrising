import React from "react"
import { graphql } from "gatsby"
import Layout from "./../components/layout"
import SEO from "./../components/seo"
import Img from "gatsby-image"

interface IBlogPost {
  data: {
    wordpressPost: {
      title: string
      excerpt: string
      date: string
      content: string
      author: {
        name: string
      }
      acf: {
        featured_image: {
          localFile: {
            childImageSharp: {
              sizes: any
            }
          }
        }
      }
    }
  }
}

const BlogPost: React.FunctionComponent<IBlogPost> = ({ data }) => {
  return (
    <Layout>
      <SEO
        title={data.wordpressPost.title}
        description={data.wordpressPost.excerpt}
      ></SEO>
      <h1>{data.wordpressPost.title}</h1>
      <p>
        Written by {data.wordpressPost.author.name} on {data.wordpressPost.date}
      </p>
      <Img
        sizes={
          data.wordpressPost.acf.featured_image.localFile.childImageSharp.sizes
        }
        alt={data.wordpressPost.title}
        style={{ maxHeight: 450 }}
      />
      <div
        style={{ marginTop: 20 }}
        dangerouslySetInnerHTML={{ __html: data.wordpressPost.content }}
      />
    </Layout>
  )
}

export const query = graphql`
  query($id: Int!) {
    wordpressPost(wordpress_id: { eq: $id }) {
      title
      content
      excerpt
      date(formatString: "MMMM DD, YYYY")
      author {
        name
      }
      acf {
        featured_image {
          localFile {
            childImageSharp {
              sizes(maxWidth: 1200) {
                ...GatsbyImageSharpSizes
              }
            }
          }
        }
      }
    }
  }
`

export default BlogPost
