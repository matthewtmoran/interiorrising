import React from "react"
import { Link } from "gatsby"

import Image from "../components/image"
import SEO from "../components/seo"

const button = {
  color: "yellow",
  padding: ".5rem 1rem",
  background: "linear-gradient( hotpink, #18a5c3) ",
}

const IndexPage = () => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignContent: "center",
      justifyContent: "center",
      margin: "auto",
    }}
  >
    <SEO title="Home" />
    <div
      style={{
        width: "300px",
        maxWidth: `300px`,
        margin: "auto",
        maxHeight: `300px`,
        borderRadius: "50%",
        border: "4px solid yellow",
        overflow: "hidden",
      }}
    >
      <Image />
    </div>
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "1rem",
        margin: "1rem",
      }}
    >
      <Link to="/about/" style={button}>
        About
      </Link>
      <Link to="/contact/" style={button}>
        Contact
      </Link>
      <Link to="/coaching/" style={button}>
        Coaching
      </Link>
      <Link to="/interior-rising/" style={button}>
        Interior Rising
      </Link>
    </div>
  </div>
)

export default IndexPage
