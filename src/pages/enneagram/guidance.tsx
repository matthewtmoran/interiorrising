import React from "react"
import SEO from "../../components/seo"
import Layout, {
  Backdrop,
  InnerContainer,
  H1,
  P,
} from "../../components/layout"
import { useStaticQuery, graphql } from "gatsby"
import SimpleForm from "../../components/SimpleForm"
import seoConfig from "../../utils/page-seo-config"

const PAGE = "guidance"

const Guidance: React.FunctionComponent<{}> = ({}) => {
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
          <H1>1-1 Enneagram Guidance</H1>
          <P>
            For anyone seeking an individualized look into who you are and the
            hurdles you personally face. These sessions are built to create
            space and time to unpack your personality, creating healthy
            self-reflection and self-image, as well as a time to explore your
            real life circumstances and relationships with care and curiosity.
          </P>
        </InnerContainer>
        <SimpleForm formName="guidance" />
      </Backdrop>
    </Layout>
  )
}

export default Guidance
