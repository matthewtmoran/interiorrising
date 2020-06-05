import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import SEO from "../components/seo"
import Hero from "../components/hero"
import Layout from "../components/layout"

const IndexPage = ({ location }) => {
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
      <Layout backgroundImage={image} location={location}>
        <SEO title="Home" />
        <Hero />
      </Layout>
    </>
  )
}

export default IndexPage
