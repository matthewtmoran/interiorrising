import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import SEO from "../components/seo"
import Layout, { Backdrop, InnerContainer, H1, P } from "../components/layout"
import GenericForm from "../components/GenericForm"
import seoConfig from "../utils/page-seo-config"

const PAGE = "contact"

interface IContact {}

const Contact: React.FunctionComponent<IContact> = ({}) => {
  const { image } = useStaticQuery(graphql`
    query {
      image: file(relativePath: { eq: "wall.jpg" }) {
        sharp: childImageSharp {
          fluid(quality: 70) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
    }
  `)
  return (
    <Layout backgroundImage={image}>
      <SEO {...seoConfig[PAGE]} />
      <Backdrop>
        <InnerContainer>
          <H1>Contact</H1>
          <P>
            Whether it's about the enneagram, photography, work or you'd just
            like to chat, I'd love to hear from you!
          </P>
        </InnerContainer>
        <GenericForm />
      </Backdrop>
    </Layout>
  )
}

export default Contact
