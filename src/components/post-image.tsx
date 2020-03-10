import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import Img, { FluidObject } from "gatsby-image"

interface IImage {
  node: {
    localFile: {
      childImageSharp: {
        fluid: FluidObject
      }
    }
  }
}

const PostImage = ({ src, alt, width }) => {
  const { allWordpressWpMedia } = useStaticQuery(allMedia)
  const originalSource = src.replace(
    /^(https?:\/\/.+?\/.+?)-(\d+x\d+)\.(.+?)$/g,
    "$1.$3"
  )
  const image: IImage = allWordpressWpMedia.edges.find(
    ({ node }) => node.source_url === originalSource
  )

  return image === null || image.node.localFile.childImageSharp === null ? (
    <img
      src={src}
      alt={alt}
      style={{ width: width ? width : "100%" }}
      className="basic"
    />
  ) : (
    <Img
      fluid={image.node.localFile.childImageSharp.fluid}
      alt={alt}
      style={{
        width: width ? width + "px" : "100%",
        maxWidth: "100%",
      }}
    />
  )
}

const allMedia = graphql`
  query {
    allWordpressWpMedia {
      edges {
        node {
          source_url
          localFile {
            publicURL
            childImageSharp {
              fluid(maxWidth: 800) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  }
`
export default PostImage
