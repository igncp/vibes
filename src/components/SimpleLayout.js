import React, {PropTypes} from "react"

export function SimpleLayout({children}) {
  return (
    <div
      className="col-sm-10 col-sm-offset-1"
    >
      <div><h1>Vibes</h1></div>
      {children}
    </div>
  )
}

SimpleLayout.propTypes = {
  children: PropTypes.node,
}
