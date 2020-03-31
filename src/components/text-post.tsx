import React, { FunctionComponent } from "react"
import parse from "html-react-parser"
import { format } from "date-fns"
import Img from "gatsby-image"
import DateText from "../shared/DateText"
import BlogTitle from "../shared/BlogTitle"
import BlogPostContainer from "../shared/BlogPostContainer"
import styled from "@emotion/styled"

interface ITextPost {
  content: string
  date: string
  excerpt: string
  image?: any
  slug: string
  title: string
}

const Content = styled("div")`
  text-align: left;
`

const Excerpt = styled("div")`
  font-style: italic;
`

const TextPost: FunctionComponent<ITextPost> = ({
  content,
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
      <Excerpt>{parse(excerpt)}</Excerpt>
      {image && <Img fluid={image.fluid} key={image.src} />}
      <Content>{parse(content)}</Content>
    </BlogPostContainer>
  )
}

export default TextPost
