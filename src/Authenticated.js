import React, {PropTypes} from "react"

import {Groups} from "./Groups"

export function Authenticated({token}) {
  return (
    <div>
      <Groups token={token} />
    </div>
  )
}

Authenticated.propTypes = {
  token: PropTypes.string,
}
