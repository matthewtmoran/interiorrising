import React, { FunctionComponent } from "react"
import parse from "html-react-parser"
import { format } from "date-fns"
import Img from "gatsby-image"
import DateText from "../shared/DateText"
import BlogTitle from "../shared/BlogTitle"
import BlogPostContainer from "../shared/BlogPostContainer"

interface IPhotoPost {
  date: string
  excerpt: string
  image: any
  slug: string
  title: string
}

const PhotoPost: FunctionComponent<IPhotoPost> = ({
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

export default PhotoPost
