import React, { FunctionComponent } from "react"
import parse from "html-react-parser"
import styled from "@emotion/styled"
import { DomElement } from "domhandler"
import { format } from "date-fns"
import { graphql, useStaticQuery } from "gatsby"
import Img, { FluidObject } from "gatsby-image"
import Gallery from "../components/gallery"
import IGalleryImage from "./../interfaces/IGalleryImage"

const BlogPostContainer = styled("div")`
  width: 100%;
  margin-top: 3rem;
  margin-bottom: 3rem;
  text-align: center;

  /* remove white background on gallery close cta */
  section > svg {
    background: transparent !important;
  }
`

const DateText = styled("p")`
  font-style: italic;
  margin: 0;
`

interface IBlogPost {
  title: string
  content: string
  date: string
  excerpt: string
}

interface IImage {
  node: {
    localFile: {
      childImageSharp: {
        fluid: FluidObject
      }
    }
  }
}

const BlogPost: FunctionComponent<IBlogPost> = ({
  title,
  content,
  date,
  excerpt,
}) => {
  return (
    <BlogPostContainer>
      <h1>{title}</h1>
      <DateText>{format(new Date(date), "LLLL Io")}</DateText>
      {parse(excerpt)}
      {parse(content, { replace: replaceMedia })}
    </BlogPostContainer>
  )
}

const replaceMedia = (node: DomElement) => {
  if (node.name === "ul" && node.attribs.class.includes("wp-block-gallery")) {
    const items = node.children.map(n => getImageData(n))
    return <Gallery images={items} />
  }
}

const getImageData = (node: DomElement): IGalleryImage => {
  if (
    node.name === "li" &&
    node.attribs.class.includes("blocks-gallery-item")
  ) {
    const image = getImage(node)
    if (!image) {
      return
    }

    // get the list of all media items
    const { allWordpressWpMedia } = useStaticQuery(allMedia)

    // get the original source url
    const originalSource = image.attribs.src.replace(
      /^(https?:\/\/.+?\/.+?)-(\d+x\d+)\.(.+?)$/g,
      "$1.$3"
    )

    // the original image and meta data
    const originalImage: IImage = allWordpressWpMedia.edges.find(
      ({ node }) => node.source_url === originalSource
    )

    // if the image is not found in the media library for whatever reason
    if (
      originalImage === null ||
      originalImage.node.localFile.childImageSharp === null
    ) {
      return {
        itemId: originalSource,
        mediaUrl: originalSource,
        metaData: {
          type: "image",
        },
      }
    } else {
      const { media_type, source_url, id } = originalImage.node as any
      return {
        itemId: id,
        mediaUrl: source_url,
        metaData: {
          type: media_type,
        },
      }
    }
  }
}

const getImage = (node: DomElement) => {
  if (node.name === "img") {
    return node
  } else if (node.children != null) {
    for (let index = 0; index < node.children.length; index++) {
      let image = getImage(node.children[index])
      if (image !== null) return image
    }
  }
}

const allMedia = graphql`
  query {
    allWordpressWpMedia {
      edges {
        node {
          id
          link
          media_type
          description
          link
          title
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
export default BlogPost
