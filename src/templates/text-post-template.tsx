import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import TextPost from "../components/text-post"
import { FluidObject } from "gatsby-image"

interface IBlogPost {
  data: {
    post: {
      title: string
      excerpt: string
      date: string
      content: string
      slug: string
      author: {
        name: string
      }
      yoast_meta: {
        yoast_wpseo_metadesc: string
        yoast_wpseo_title: string
      }

      // acf: {
      //   featured_media: {
      //     localFile: {
      //       childImageSharp: {
      //         fluid: FluidObject
      //       }
      //     }
      //   }
      // }
    }
  }
}

const TextPostTemplate: React.FunctionComponent<IBlogPost> = ({ data }) => {
  const { post } = data
  return (
    <Layout>
      <SEO
        title={post.title || post.yoast_meta.yoast_wpseo_title}
        description={post.excerpt || post.yoast_meta.yoast_wpseo_metadesc}
      />
      <TextPost
        content={post.content}
        date={post.date}
        excerpt={post.excerpt}
        // image={post.acf?.featured_media.localFile.childImageSharp}
        slug={post.slug}
        title={post.title}
      />
    </Layout>
  )
}

export const query = graphql`
  query($id: String) {
    post: wordpressPost(id: { eq: $id }) {
      title
      content
      excerpt
      slug
      date(formatString: "MMMM DD, YYYY")
      author {
        name
      }
      yoast_meta {
        yoast_wpseo_metadesc
        yoast_wpseo_title
      }
      # acf {
      #   featured_media {
      #     localFile {
      #       childImageSharp {
      #         fluid(maxWidth: 900, quality: 90) {
      #           ...GatsbyImageSharpFluid
      #         }
      #       }
      #     }
      #   }
      # }
    }
  }
`

export default TextPostTemplate
