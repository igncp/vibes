import React, {PropTypes} from "react"

const inlineStyles = getInlineStyles()

export function ShowcasePhoto({src}) {
  return src ? (
    <p style={inlineStyles.photoWrapper}>
      <img
        src={src}
        style={inlineStyles.photo}
      />
    </p>
  ) : null
}

ShowcasePhoto.propTypes = {
  src: PropTypes.string,
}

function getInlineStyles() {
  return {
    photoWrapper: {
      textAlign: "center",
    },
    photo: {
      borderRadius: 10,
      maxWidth: 300,
      boxShadow: "0 0 10px 1px #aaa",
    },
  }
}
