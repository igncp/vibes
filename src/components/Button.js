import React, {PropTypes} from "react"

const handleOnClick = onClick => (e) => {
  e.preventDefault()
  onClick && onClick()
}

export function Button({onClick, children, visibility}) {
  return (
    <a
      className="btn btn-default"
      href="#"
      onClick={handleOnClick(onClick)}
      style={{
        visibility: visibility || "visible",
      }}
    >{children}</a>
  )
}

Button.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
  visibility: PropTypes.string,
}
