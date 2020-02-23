import React from "react"
import styled from "@emotion/styled"
import { css } from "@emotion/core"
import { graphql, useStaticQuery } from "gatsby"
import Img from "gatsby-image"

const ImageBackground = styled("div")`
  background-image: url("/images/building-and-trees.jpg");
  background-position: top 20% center;
  background-size: cover;
  height: 50vh;

  + * {
    margin-top: 0;
  }
`
const HeroContainer = styled("div")`
  display: flex;
  align-items: center;
  align-self: center;
  justify-content: start;
  flex-direction: column;
  margin-top: 10%;

  @media (min-width: 420px) {
    margin-top: 20%;
    flex-direction: row;
  }
`
const ImageContainer = styled("div")`
  max-width: 100%;
  margin: 0px 2rem;
  max-height: 300px;
  max-height: 200px;
  border-radius: 50%;
  overflow: hidden;
  width: 200px;

  @media (min-width: 420px) {
    width: 300px;
    max-height: 300px;
  }
`

const TextContainer = styled("div")`
  display: flex;
  flex-direction: column;
`

const SubText = styled("div")`
  font-weight: bold;
  color: black;
  font-size: 0.75rem;

  @media (min-width: 420px) {
    font-size: 1rem;
  }
`
const HeroText = styled("h1")`
  margin: 1rem;
  font-size: 3rem;
  color: black;

  @media (min-width: 420px) {
    margin: 0px 2rem 1rem;
    font-size: 4rem;
  }
`

const Hero: React.FunctionComponent = () => {
  const { image } = useStaticQuery(graphql`
    query {
      image: file(relativePath: { eq: "jill.jpg" }) {
        sharp: childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
    }
  `)
  return (
    <HeroContainer>
      <ImageContainer>
        <Img fluid={image.sharp.fluid} />
      </ImageContainer>
      <TextContainer>
        <HeroText>Jillian Moran</HeroText>
        <div
          css={{
            display: "flex",
            justifyContent: "space-between",
            padding: "0 3rem",
          }}
        >
          <SubText>Photography</SubText>
          <SubText>Writings</SubText>
          <SubText>Enneagram</SubText>
        </div>
      </TextContainer>
    </HeroContainer>
  )
}

export default Hero
