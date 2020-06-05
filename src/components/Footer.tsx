import React, { useState, useRef } from "react"
import styled from "@emotion/styled"
import Icon from "../images/instagram.inline.svg"

const Footer = ({}) => {
  return (
    <Container>
      <a
        href={`https://instagram.com/${process.env.GATSBY_INSTAGRAM_ACCOUNT}`}
        target="_blank"
      >
        <StyledIcon />
      </a>
    </Container>
  )
}

const Container = styled("div")`
  position: absolute;
  background: transparent;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding: 1rem;
`

const StyledIcon = styled(Icon)`
  height: 1.5rem;
  width: 1.5rem;
  transition: 0.2s ease;

  &:hover {
    cursor: pointer;
    transform: scale(1.5);
  }
`

export default Footer
