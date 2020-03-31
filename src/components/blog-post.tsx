import React, { FunctionComponent } from "react"
import { Link } from "gatsby"
import parse from "html-react-parser"
import styled from "@emotion/styled"
import { format } from "date-fns"
import Img from "gatsby-image"

const BlogTitle = styled(Link)`
  color: #333;
  text-decoration: none;
`

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
  date: string
  excerpt: string
  image: any
  slug: string
  title: string
}

const BlogPost: FunctionComponent<IBlogPost> = ({
  date,
  excerpt,
  image,
  title,
  slug,
}) => {
  return (
    <BlogPostContainer>
      <h1>
        <BlogTitle to={slug}>{title}</BlogTitle>
      </h1>
      <DateText>{format(new Date(date), "LLLL Io")}</DateText>
      {parse(excerpt)}
      <Img fluid={image.fluid} key={image.src} />
    </BlogPostContainer>
  )
}

export default BlogPost
