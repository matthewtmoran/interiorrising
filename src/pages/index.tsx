import React from "react"
import styled from "@emotion/styled"
import { graphql, useStaticQuery } from "gatsby"
import SEO from "../components/seo"
import Hero from "../components/hero"
import Layout from "./../components/layout"

const breakpoints = [576, 768, 992, 1200]

const mq = breakpoints.map(bp => `@media (min-width: ${bp}px)`)

const ImageBackground = styled("div")`
  background-image: url("/images/building-and-trees.jpg");
  background-position: top 20% center;
  background-size: cover;
  height: 100vh;

  + * {
    margin-top: 0;
  }
`

const IndexPage = () => {
  const { image } = useStaticQuery(graphql`
    query {
      image: file(relativePath: { eq: "building-and-trees.jpg" }) {
        sharp: childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
    }
  `)
  return (
    <>
      <ImageBackground Tag="section" fluid={image.sharp.fluid} fadeIn="soft">
        <Layout>
          <SEO title="Home" />
          <Hero />
        </Layout>
      </ImageBackground>
    </>
  )
}

export default IndexPage
