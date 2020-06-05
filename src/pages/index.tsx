import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import SEO from "../components/seo"
import Hero from "../components/hero"
import Layout from "../components/layout"
import seoConfig from "../utils/page-seo-config"

const PAGE = "home"

const IndexPage = ({ location }) => {
  const { image } = useStaticQuery(graphql`
    query {
      image: file(relativePath: { eq: "building-and-trees-light.jpg" }) {
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
      <Layout backgroundImage={image} location={location}>
        <SEO {...seoConfig[PAGE]} />
        <Hero />
      </Layout>
    </>
  )
}

export default IndexPage
