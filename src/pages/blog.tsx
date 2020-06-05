import React, { FunctionComponent } from "react"
import { graphql, useStaticQuery } from "gatsby"
import TextPost from "../components/text-post"
import SEO from "../components/seo"
import Layout from "../components/layout"
import seoConfig from "../utils/page-seo-config"

const PAGE = "blog"

interface IBlogs {}

const Blog: FunctionComponent<IBlogs> = ({}) => {
  const {
    data: { posts },
  } = useStaticQuery(pageQuery)

  return (
    <Layout>
      <SEO {...seoConfig[PAGE]} />
      {posts.map(({ post }) => {
        return (
          <TextPost
            content={post.content}
            date={post.date}
            excerpt={post.excerpt}
            image={post.acf?.featured_media.localFile.childImageSharp}
            key={post.id}
            slug={post.slug}
            title={post.title}
          />
        )
      })}
    </Layout>
  )
}

const pageQuery = graphql`
  query {
    data: allWordpressPost(
      filter: { categories: { elemMatch: { name: { eq: "Text" } } } }
    ) {
      posts: edges {
        post: node {
          id
          slug
          date
          title
          content
          excerpt
          acf {
            featured_media {
              localFile {
                childImageSharp {
                  fluid(maxWidth: 900, quality: 90) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`
export default Blog
