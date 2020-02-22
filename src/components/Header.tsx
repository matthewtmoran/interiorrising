import { Link } from "gatsby"
import { css, jsx } from "@emotion/core"
import React from "react"

const link = css({
  color: "#333",
  display: "block",
  textDecoration: `none`,
  padding: "1rem",
})

const Header = ({ siteTitle }) => (
  <header
    css={css`
      background: transparent;
      margin-bottom: 1.45rem;
    `}
  >
    <div
      css={css({
        margin: "0 auto",
        maxWidth: "1140px",
        height: "100%",
        display: "float",
        justifyContent: "flex-end",
      })}
    >
      <Link to="/" css={link}>
        Words
      </Link>

      <Link to="/" css={link}>
        Photos
      </Link>

      <Link to="/" css={link}>
        Contact
      </Link>
    </div>
  </header>
)

export default Header
