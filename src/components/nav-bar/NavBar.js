import React, {PropTypes} from "react"
import {Link} from "react-router"

import styles from "./styles.css"

function onGitHubIconClick() {
  window.open("https://github.com/igncp/vibes")
}

export function NavBar({children}) {
  return (
    <nav className="navbar navbar-default">
      <div className="container-fluid">
        <div className="navbar-header">
            <button
              className="navbar-toggle collapsed"
              data-target="#bs-example-navbar-collapse-1"
              data-toggle="collapse"
              type="button"
            >
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <Link
              className="navbar-brand"
              to="/"
            >Vibes</Link>
            <span
              className={`fa fa-github ${styles.githubIcon}`}
              onClick={onGitHubIconClick}
              title="Repository"
            />
        </div>
        <div
          className="collapse navbar-collapse"
          id="bs-example-navbar-collapse-1"
        >
          <ul className="nav navbar-nav navbar-right">
            {children}
          </ul>
        </div>
      </div>
    </nav>
  )
}

NavBar.propTypes = {
  children: PropTypes.node,
}
