import React, {PropTypes} from "react"

const inlineStyles = getInlineStyles()

export function EmbeddedMap({query, zoom}) {
  return query ? (
    <div>
      <iframe
        src={`//www.google.com/maps/embed/v1/place?q=${query}&zoom=${zoom}&key=AIzaSyBuXY1o2UEuaX1JE-zEMDVG8lKASKT2AXg`}
        style={inlineStyles.mapIframe}
      />
    </div>
  ) : null
}

EmbeddedMap.propTypes = {
  query: PropTypes.string.isRequired,
  zoom: PropTypes.number,
}

EmbeddedMap.defaultProps = {
  zoom: 12,
}

function getInlineStyles() {
  return {
    mapIframe: {
      border: 0,
      height: 400,
      margin: "30px 0",
      width: "100%",
    },
  }
}
