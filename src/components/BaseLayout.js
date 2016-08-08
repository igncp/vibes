import React, {PropTypes} from "react"

import {NavBar} from "./nav-bar/NavBar"

export function BaseLayout({navBarButtons, children}) {
  return (
    <div>
      {navBarButtons && navBarButtons.length > 0 ? (
        <NavBar>{navBarButtons}</NavBar>
      ) : null}

      <div
        className="col-sm-10 col-sm-offset-1"
      >
        {children}
      </div>
    </div>
  )
}

BaseLayout.propTypes = {
  children: PropTypes.node.isRequired,
  navBarButtons: PropTypes.arrayOf(PropTypes.node),
}
