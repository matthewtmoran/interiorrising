import React, { FunctionComponent } from "react"
import { Global, css } from "@emotion/core"
import styled from "@emotion/styled"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header"
import "./layout-styles.css"

const MainContainer = styled("main")`
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: flex-start;
  padding: 3rem 1.5rem;
  margin: auto;

  @media (min-width: 420px) {
    max-width: 900px;
    justify-content: center;
  }
`

interface ILayout {
  path?: string
}

const Layout: FunctionComponent<ILayout> = ({ path, children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <Global
        styles={css`
          h1,
          h2,
          h3,
          h4,
          p,
          a,
          button,
          div {
            font-family: "Roboto Condensed";
          }
        `}
      />
      <Header siteTitle={data.site.siteMetadata.title} path={path} />
      <MainContainer>{children}</MainContainer>
    </>
  )
}

export default Layout
