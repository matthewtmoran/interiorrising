import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import PhotoPost from "../components/photo-post"
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
      //   acf: {
      //     featured_media: {
      //       localFile: {
      //         childImageSharp: {
      //           fluid: FluidObject
      //         }
      //       }
      //     }
      //   }
    }
  }
}

const PhotoPostTemplate: React.FunctionComponent<IBlogPost> = ({ data }) => {
  const { post } = data
  return (
    <Layout>
      <SEO title={post.title} description={post.excerpt}></SEO>
      <PhotoPost
        title={post.title}
        slug={post.slug}
        date={post.date}
        excerpt={post.excerpt}
        image={post.acf.featured_media.localFile.childImageSharp}
      />
    </Layout>
  )
}

// export const query = graphql`
//   query($id: String) {
//     post: wordpressPost(id: { eq: $id }) {
//       title
//       content
//       excerpt
//       slug
//       date(formatString: "MMMM DD, YYYY")
//       author {
//         name
//       }
//       # acf {
//       #   featured_media {
//       #     localFile {
//       #       childImageSharp {
//       #         fluid(maxWidth: 900, quality: 90) {
//       #           ...GatsbyImageSharpFluid
//       #         }
//       #       }
//       #     }
//       #   }
//       # }
//     }
//   }
// `

export default PhotoPostTemplate
