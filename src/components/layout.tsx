import React, { FunctionComponent } from "react"
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
      <Header siteTitle={data.site.siteMetadata.title} path={path} />
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 1400,
          padding: `0px 1.45rem`,
          paddingTop: 0,
        }}
      >
        <MainContainer>{children}</MainContainer>
      </div>
    </>
  )
}

export default Layout
