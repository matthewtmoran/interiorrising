import React, { FunctionComponent } from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Img from "gatsby-image"
import parse from "html-react-parser"
import PostImage from "../components/post-image"
import { DomElement } from "domhandler"
import Masonry from "react-masonry-css"
import styled from "@emotion/styled"

const DateText = styled("p")`
  font-style: italic;
  margin: 0;
`

const MasonryContainer = styled("div")`
  width: 100%;
  height: 100%;

  .masonry-grid_column > div {
    margin-bottom: 5px; /* space between items */
  }

  @media (min-width: 420px) {
    .masonry-grid {
      margin-left: -15px; /* gutter size offset */
    }
    .masonry-grid_column {
      padding-left: 15px; /* gutter size offset */
    }
    .masonry-grid_column > div {
      margin-bottom: 15px; /* space between items */
    }
  }
`
const breakpointColumnsObj = {
  default: 4,
  1100: 3,
  700: 2,
  500: 1
};

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


const BlogPost: FunctionComponent<IBlogPost> = ({ data }) => {
  return (
    <Layout>
      <SEO
        title={data.wordpressPost.title}
        description={data.wordpressPost.excerpt}
      />
      <h1>{data.wordpressPost.title}</h1>
      <DateText>{data.wordpressPost.date}</DateText>
      {parse(data.wordpressPost.excerpt)}

      {data.wordpressPost.acf.featured_image?.localFile.childImageSharp
        .sizes && (
        <Img
          sizes={
            data.wordpressPost.acf.featured_image.localFile.childImageSharp
              .sizes
          }
          alt={data.wordpressPost.title}
          style={{ maxHeight: 450 }}
        />
      )}
      <MasonryContainer>
        {parse(data.wordpressPost.content, { replace: replaceMedia })}
      </MasonryContainer>
    </Layout>
  )
}

export const query = graphql`
  query($id: String) {
    wordpressPost(id: { eq: $id }) {
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

const replaceMedia = (node: DomElement) => {
  // replaces inline gallery images with our components
  if (
    node.name === "li" &&
    node.attribs.class.includes("blocks-gallery-item")
  ) {
    const image = getImage(node)
    if (image !== null) {
      return (
        <PostImage
          key={image.attribs.src}
          src={image.attribs.src}
          alt={image.attribs.alt}
          width={image.attribs.width}
        />
      )
    }
  }

  // replaces gallery ul element with Masonry component
  if (node.name === "ul" && node.attribs.class.includes("wp-block-gallery")) {
    return (
      <Masonry
        style={{ display: "flex", width: "100%" }}
        className="masonry-grid"
        columnClassName={"masonry-grid_column"} 
        breakpointCols={breakpointColumnsObj }
      >
        {node.children.map(n => replaceMedia(n))}
      </Masonry>
    )
  }
}

export default BlogPost
