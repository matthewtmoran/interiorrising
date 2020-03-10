import React, { FunctionComponent } from "react"
import parse from "html-react-parser"
import PostImage from "../components/post-image"
import { DomElement } from "domhandler"
import Masonry from "react-masonry-css"
import styled from "@emotion/styled"
import { format } from "date-fns"

const BlogPostContainer = styled("div")`
  width: 100%;
  margin-top: 3rem;
  text-align: center;
`

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

  .masonry-grid {
    margin-left: -5px; /* gutter size offset */
  }
  .masonry-grid_column {
    padding-left: 5px; /* gutter size offset */
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
  500: 2,
}

interface IBlogPost {
  title: string
  content: string
  date: string
  excerpt: string
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
      <MasonryContainer>
        {parse(content, { replace: replaceMedia })}
      </MasonryContainer>
    </BlogPostContainer>
  )
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
        breakpointCols={breakpointColumnsObj}
      >
        {node.children.map(n => replaceMedia(n))}
      </Masonry>
    )
  }
}

export default BlogPost
