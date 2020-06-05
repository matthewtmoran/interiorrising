import React from "react"
import SEO from "../components/seo"
import Layout, {
  Backdrop,
  InnerContainer,
  StyledLink,
  ButtonContainer,
  H1,
  P,
} from "../components/layout"
import { useStaticQuery, graphql } from "gatsby"

const Enneagram: React.FunctionComponent<{}> = ({}) => {
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
        title={"Enneagram"}
        description={
          "Information about enneagram coaching, enneagram workshops, enneagram speaking events, and enneagram courses.  "
        }
      />
      <Backdrop>
        <InnerContainer>
          <H1>Lets Talk Enneagram</H1>
          <P>
            Interested in deeper knowledge to growth and wholeness through the
            enneagram?
          </P>
          <P>
            The road to self-knowledge can feel scary and overwhelming, but you
            are not alone. As an Enneagram Guide, I’d be “over the moon” to
            spend one on one time with you as a compassionate helping hand to
            unmasking self-limiting beliefs, unconscious motivations, and
            discovering what makes you, you.
          </P>
        </InnerContainer>
        <ButtonContainer>
          <StyledLink to={"enneagram/guidance"}>
            1:1 Enneagram Guidance
          </StyledLink>
          <StyledLink to={"enneagram/masterclass"}>
            1:1 Enneagram Masterclass
          </StyledLink>
          <StyledLink to={"contact"}>Other</StyledLink>
        </ButtonContainer>
      </Backdrop>
    </Layout>
  )
}

export default Enneagram
