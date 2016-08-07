import React, {PropTypes} from "react"
import {Link} from "react-router"

const handleOnClick = onClick => (e) => {
  e.preventDefault()
  onClick && onClick()
}

export function Button({onClick, children, visibility, link, extraClassName=""}) {
  const commonProps = {
    className: `btn btn-default ${extraClassName}`,
    style: {
      visibility: visibility || "visible",
    },
  }

  return link ? (
      <Link
        to={link}
        {...commonProps}
      >{children}</Link>
    ) : (
      <a
        href="#"
        onClick={handleOnClick(onClick)}
        {...commonProps}
      >{children}</a>
  )
}

Button.propTypes = {
  children: PropTypes.node,
  extraClassName: PropTypes.string,
  link: PropTypes.string,
  onClick: PropTypes.func,
  visibility: PropTypes.string,
}
