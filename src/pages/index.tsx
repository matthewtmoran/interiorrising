import React from "react"
import { css } from "@emotion/core"
import { graphql, useStaticQuery } from "gatsby"
import SEO from "../components/seo"
import Hero from "../components/hero"
import Layout from "../components/layout"
import BackgroundImage from "gatsby-background-image"

const IndexPage = ({ path }) => {
  const { image } = useStaticQuery(graphql`
    query {
      image: file(relativePath: { eq: "building-and-trees.jpg" }) {
        sharp: childImageSharp {
          fluid(quality: 100) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
    }
  `)
  return (
    <>
      <BackgroundImage
        Tag="section"
        fluid={image.sharp.fluid}
        fadeIn="soft"
        backgroundColor="#fff"
        css={css`
          background-position: top 20% center;
          background-size: cover;
          height: 100vh;

          + * {
            margin-top: 0;
          }
        `}
      >
        <Layout path={path}>
          <SEO title="Home" />
          <Hero />
        </Layout>
      </BackgroundImage>
    </>
  )
}

export default IndexPage
