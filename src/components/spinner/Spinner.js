import React, {PropTypes} from "react"

import styles from "./style.css"

export function Spinner({width, height}) {
  return (
    <div
      className={styles.spinner}
      style={{
        width: width || 40,
        height: height || 40,
      }}
    />
  )
}

Spinner.propTypes = {
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
}
