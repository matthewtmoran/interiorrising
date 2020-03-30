/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import styled from "@emotion/styled"
import PropTypes from "prop-types"
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

const Layout = ({ path, children }) => {
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

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
