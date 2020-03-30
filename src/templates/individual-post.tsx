import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import BlogPost from "./blog-post"

interface IBlogPost {
  data: {
    post: {
      title: string
      excerpt: string
      date: string
      content: string
      author: {
        name: string
      }
    }
  }
}

const IndividualPost: React.FunctionComponent<IBlogPost> = ({ data }) => {
  const { post } = data
  return (
    <Layout>
      <SEO title={post.title} description={post.excerpt}></SEO>
      <BlogPost
        title={post.title}
        content={post.content}
        date={post.date}
        excerpt={post.excerpt}
        image={post.acf.featured_media.localFile.childImageSharp.fluid}
      />

      <h1>{post.title}</h1>
      <p>
        Written by {post.author.name} on {post.date}
      </p>
    </Layout>
  )
}

export const query = graphql`
  query($id: String) {
    post: wordpressPost(id: { eq: $id }) {
      title
      content
      excerpt
      date(formatString: "MMMM DD, YYYY")
      author {
        name
      }
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
`

export default IndividualPost
