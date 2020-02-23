import React, { useState, useRef } from "react"
import { Link } from "gatsby"
import styled from "@emotion/styled"
import MenuButton from "./menu-button"
import useOutsideClick from "../hooks/use-outside-click"

const HeaderContainer = styled("header")`
  background: transparent;
  position: relative;
`

const Navigation = styled("div")`
  background: white;
  display: flex;
  height: 100%;

  @media (min-width: 420px) {
    background: transparent;
    margin: 0 auto;
    max-width: 1140px;
    height: 100%;
    justify-content: flex-end;
  }
`

const NavLinks = styled("div")`
  height: 100%;
  width: ${(props: { open: boolean }) => (props.open ? "250px" : 0)};
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  background-color: #fff;
  overflow-x: hidden;
  transition: 0.2s ease;
  padding-top: 60px;
  box-shadow: 0 0 10px #333;

  @media (min-width: 420px) {
    width: 100%;
    display: flex;
    padding-top: 0;
    position: relative;
    background: transparent;
    margin: 0 auto;
    max-width: 1140px;
    height: 100%;
    display: float;
    justify-content: flex-end;
    box-shadow: none;
  }
`

const StyledLink = styled(Link)`
  display: block;
  text-decoration: none;
  padding: 1rem;
  color: #333;
  overflow: hidden;
  white-space: nowrap;
`

const Header = ({ siteTitle }) => {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const menuButtonRef = useRef(null)
  useOutsideClick(ref, handleButtonClick)

  function handleButtonClick(event) {
    if (
      !open &&
      (menuButtonRef.current === event.target ||
        menuButtonRef.current.contains(event.target))
    ) {
      return setOpen(true)
    }
    if (
      open &&
      ref.current !== event.target &&
      !ref.current.contains(event.target)
    ) {
      return setOpen(false)
    }
  }

  return (
    <HeaderContainer>
      <MenuButton open={open} ref={menuButtonRef} />
      <Navigation>
        <NavLinks open={open} ref={ref}>
          <StyledLink to="/">Words</StyledLink>
          <StyledLink to="/">Photos</StyledLink>
          <StyledLink to="/">Contact</StyledLink>
        </NavLinks>
      </Navigation>
    </HeaderContainer>
  )
}

export default Header
