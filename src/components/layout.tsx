import React, { useEffect, FunctionComponent } from "react"
import styled from "@emotion/styled"
import BackgroundImage from "gatsby-background-image"
import { Link, useStaticQuery, graphql } from "gatsby"
import Header from "./header"
import "./layout-styles.css"
import Footer from "./Footer"

interface ILayout {
  path?: string
  invertHeader?: boolean
  backgroundImage?: any
  location?: any
}

export const SITE_QUERY = graphql`
  query SiteTitleQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`

const Layout: FunctionComponent<ILayout> = ({
  path,
  children,
  invertHeader,
  backgroundImage,
  location,
}) => {
  const data = useStaticQuery(SITE_QUERY)

  if (backgroundImage) {
    return (
      <StyledBackgroundImage
        Tag="section"
        fluid={backgroundImage.sharp.fluid}
        fadeIn="soft"
        backgroundColor="#fff"
        pathname={location?.pathname}
      >
        <Header
          siteTitle={data.site.siteMetadata.title}
          path={path}
          invert={invertHeader}
        />
        <MainContainer>{children}</MainContainer>
        <Footer />
      </StyledBackgroundImage>
    )
  }
  return (
    <>
      <Header
        siteTitle={data.site.siteMetadata.title}
        path={path}
        invert={!isHome(location?.pathname)}
      />
      <MainContainer>{children}</MainContainer>
    </>
  )
}

const isHome = (pathname: string) => {
  return pathname === "/"
}

interface ILocation {
  pathname?: string
}

const StyledBackgroundImage = styled(BackgroundImage)`
  overflow: auto;
  min-height: 100vh;
  background-size: cover;
  background-position: ${({ pathname }: ILocation) => {
    return isHome(pathname) ? "top 20% center" : "left 20% top"
  }};
  height: ${({ pathname }: ILocation) => {
    return isHome(pathname) ? "100%" : "unset"
  }};

  @media (min-width: 420px) {
    background-position: center;
    background-size: cover;
    height: 100%;
  }

  + * {
    margin-top: 0;
  }
`

const MainContainer = styled("main")`
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: flex-start;
  padding: 6rem 1.5rem 3rem;
  margin: auto;

  @media (min-width: 420px) {
    height: 100%;
    max-width: 900px;
    justify-content: flex-start;
  }
`

export const Backdrop = styled("div")`
  background: rgba(0, 0, 0, 0.4);
  width: 90%;
  display: flex;
  flex-direction: column;
  padding: 1.5rem 1rem;
  text-align: center;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);

  @media (min-width: 420px) {
    padding: 3rem 2rem;
  }
`

export const InnerContainer = styled("div")`
  width: 100%;
  margin: auto;
`

export const H1 = styled("h1")`
  color: #fff;
  margin-bottom: 1rem;
  font-size: 1.5rem;

  @media (min-width: 420px) {
    font-size: 2.25rem;
  }
`
export const P = styled("p")`
  color: #fff;
`

export const ButtonContainer = styled("div")`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (min-width: 420px) {
    flex-direction: row;
  }
`

export const Button = styled("button")`
  flex: 1;
  width: 200px;
  cursor: pointer;
  border: none;
  background: transparent;
  border: 2px solid #fff;
  color: #fff;
  margin: 1rem;
  padding: 10px;
  font-size: 1rem;
  transition: 0.2s ease;
  text-decoration: none;

  &:hover {
    background: #fff;
    color: #333;
  }
`

export const StyledLink = styled(Link)`
  flex: 1;
  width: 200px;
  cursor: pointer;
  border: none;
  background: transparent;
  border: 2px solid #fff;
  color: #fff;
  margin: 1rem;
  padding: 10px;
  font-size: 15px;
  transition: 0.2s ease;
  text-decoration: none;

  &:hover {
    background: #fff;
    color: #333;
  }
`

export default Layout
