import React, { forwardRef, Ref } from "react"
import styled from "@emotion/styled"

const ButtonContainer = styled("div")`
  width: 30px;
  position: relative;
  transform: rotate(0deg);
  transition: 0.5s ease-in-out;
  top: 10px;
  left: 10px;
  cursor: pointer;
  position: absolute;
  margin: 1rem;
  background: transparent;
  z-index: 9;

  span {
    display: block;
    position: absolute;
    height: 5px;
    width: 100%;
    background: black;
    border-radius: 9px;
    opacity: 1;
    left: 0;
    transform: rotate(0deg);
    transition: 0.25s ease-in-out;
  }

  span:nth-child(1) {
    top: 0px;
  }

  span:nth-child(2),
  span:nth-child(3) {
    top: 8px;
  }

  span:nth-child(4) {
    top: 16px;
  }

  &.open span:nth-child(1) {
    top: 18px;
    width: 0%;
    left: 50%;
  }

  &.open span:nth-child(2) {
    transform: rotate(45deg);
  }

  &.open span:nth-child(3) {
    transform: rotate(-45deg);
  }

  &.open span:nth-child(4) {
    top: 18px;
    width: 0%;
    left: 50%;
  }

  @media (min-width: 420px) {
    display: none;
  }
`

interface IMenuButton {
  open: boolean
}

const MenuButton = forwardRef(
  ({ open }: IMenuButton, ref?: Ref<HTMLDivElement>) => {
    return (
      <ButtonContainer className={open ? "open" : ""} ref={ref}>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </ButtonContainer>
    )
  }
)

export default MenuButton
