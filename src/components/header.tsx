import React, { useState, useRef } from "react"
import { Link } from "gatsby"
import styled from "@emotion/styled"
import MenuButton from "./menu-button"
import useOutsideClick from "../hooks/use-outside-click"
import { Location } from "@reach/router"

const isHome = (pathname: string) => {
  return pathname === "/"
}

const shouldInvert = (pathname: string) => {
  // it should invert if its' not one of these routes
  const blackRoutes = ["/", "/blog"]
  return blackRoutes.indexOf(pathname) < 0
}

const NavLink = props => {
  return (
    <StyledLink
      {...props}
      getProps={({ isCurrent, ...rest }) => {
        // default is transparent when not active
        let color = "transparent"
        if (isCurrent) {
          if (!props.invert) {
            // if current but no invert prop is passed, set to black
            color = "#333"
          } else {
            // if invert is true set to white
            color = "#fff"
          }
        }
        return {
          style: {
            borderBottom: `2px solid ${color}`,
          },
        }
      }}
    />
  )
}

const Header = ({ siteTitle, invert }) => {
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
    <Location>
      {locationProps => {
        return (
          <HeaderContainer>
            <MenuButton open={open} ref={menuButtonRef} />
            <Navigation>
              <NavLinks open={open} ref={ref}>
                <NavLink
                  invert={shouldInvert(locationProps.location.pathname)}
                  to="/"
                >
                  Home
                </NavLink>
                <NavLink
                  invert={shouldInvert(locationProps.location.pathname)}
                  to="/enneagram"
                >
                  Enneagram
                </NavLink>
                {/* <NavLink
                  invert={shouldInvert(locationProps.location.pathname)}
                  to="/blog"
                >
                  Blog
                </NavLink> */}
                <NavLink
                  invert={shouldInvert(locationProps.location.pathname)}
                  to="/contact"
                >
                  Contact
                </NavLink>
              </NavLinks>
            </Navigation>
          </HeaderContainer>
        )
      }}
    </Location>
  )
}

export default Header

const HeaderContainer = styled("header")`
  position: fixed;
  display: flex;
  flex-direction: column;
  width: 100%;
  z-index: 999;
  background: transparent;
  @media (min-width: 420px) {
    position: absolute;
    display: block;
  }
`

const Navigation = styled("div")`
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
  font-family: "Roboto Condensed";

  @media (min-width: 420px) {
    color: ${({ invert }: { invert: boolean }) => (invert ? "#fff" : "#333")};
  }
`
