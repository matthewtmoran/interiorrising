import React, { FunctionComponent } from "react"
import parse from "html-react-parser"
import styled from "@emotion/styled"
import { format } from "date-fns"
import Img from "gatsby-image"

const BlogPostContainer = styled("div")`
  width: 100%;
  margin-top: 3rem;
  margin-bottom: 3rem;
  text-align: center;
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
  image: any
}

const BlogPost: FunctionComponent<IBlogPost> = ({
  title,
  date,
  excerpt,
  image,
}) => {
  return (
    <BlogPostContainer>
      <h1>{title}</h1>
      <DateText>{format(new Date(date), "LLLL Io")}</DateText>
      {parse(excerpt)}
      <Img fluid={image.fluid} key={image.src} />
    </BlogPostContainer>
  )
}

export default BlogPost
