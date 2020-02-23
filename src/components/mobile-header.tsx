import React, { useState } from "react"
import MenuButton from "./menu-button"

interface IMobileHeader {}

const MobileHeader: React.FunctionComponent<IMobileHeader> = ({}) => {
  const [open, setOpen] = useState(false)

  const handleButtonClick = () => {
    setOpen(current => {
      return !current
    })
  }

  return (
    <div>
      <MenuButton open={open} onButtonClick={handleButtonClick} />
    </div>
  )
}

export default MobileHeader
