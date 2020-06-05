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

const MasterClass: React.FunctionComponent<{}> = ({}) => {
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
      <SEO
        title={"Enneagram Master Class"}
        description={
          "Information about enneagram coaching, enneagram workshops, enneagram speaking events, and enneagram courses.  "
        }
      />
      <Backdrop>
        <InnerContainer>
          <H1>1-1 Enneagram Masterclass</H1>
          <P>
            This one on one Enneagram Masterclass is a thorough deep dive into
            everything Enneagram. In this course of seven one on one sessions,
            we will explore personal type, Centers of Intelligence, Growth and
            Stress arrows, important information on all nine enneagram types,
            subtypes and more.
          </P>
          <P>
            This dynamic masterclass can be an important first step for anyone
            looking to start a meaningful transformation, utilizing enneagram
            language to create new perspectives on how to view themselves and
            others.
          </P>
        </InnerContainer>
        <SimpleForm formId={"102"} />
      </Backdrop>
    </Layout>
  )
}

export default MasterClass
