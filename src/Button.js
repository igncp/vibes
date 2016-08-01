import React, {PropTypes} from "react"

const handleOnClick = onClick => (e) => {
  e.preventDefault()
  onClick && onClick()
}

export function Button({onClick, children}) {
  return (
    <a
      href="#"
      onClick={handleOnClick(onClick)}
    >{children}</a>
  )
}

Button.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
}
