import React from "react"

import {Button} from "./Button"

export function NavBarButton(props) {
  return (
    <li>
      <Button {...props} />
    </li>
  )
}
