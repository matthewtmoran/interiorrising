import React from "react"
import styled from "@emotion/styled"
import { keyframes } from "@emotion/core"
import { Link, graphql, useStaticQuery } from "gatsby"
import Img from "gatsby-image"

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
            padding: "0 1rem",
          }}
        >
          <SubText to="/">Words</SubText>
          <SubText to="enneagram">Enneagram Guide</SubText>
          <SubText to="contact">Contact Me</SubText>
        </div>
      </TextContainer>
    </HeroContainer>
  )
}

export default Hero

const slideUpFadeIn = keyframes`
    0% {
        opacity:0;
        transform:  translate(0px,40px)  ;
    }
    100% {
        opacity:1;
        transform:  translate(0px,0px)  ;
    } 
`
const HeroContainer = styled("div")`
  display: flex;
  align-items: center;
  align-self: center;
  justify-content: start;
  flex-direction: column;
  margin-top: 10%;
  width: 100%;

  animation-iteration-count: 1;
  transform-origin: 50% 50%;
  animation-fill-mode: forwards;
  animation: ${slideUpFadeIn} 1s ease;
  opacity: 0;
  opacity: 1\9;

  @media (min-width: 420px) {
    margin-top: 15%;
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
  width: 100%;

  @media (min-width: 420px) {
    width: unset;
    font-size: 2rem;
  }
`

const SubText = styled(Link)`
  font-weight: bold;
  color: black;
  font-size: 1.2rem;
  text-decoration: none;

  &:after {
    display: block;
    content: "";
    border-bottom: solid 3px #54949c;
    transform: scaleX(0);
    transition: transform 250ms ease-in-out;
  }
  &:hover:after {
    transform: scaleX(1);
  }

  @media (min-width: 420px) {
    font-size: 1.5rem;
  }
`
const HeroText = styled("h1")`
  margin: 1rem;
  font-size: 3rem;
  color: black;
  text-align: center;

  @media (min-width: 420px) {
    text-align: left;
    margin: 0px 2rem 1rem;
    font-size: 4rem;
  }
`
