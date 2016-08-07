import React, {PropTypes} from "react"

import {keys, compose, sortBy, gt} from "ramda"

const membersCountLabelsMap = {
  250: "default",
  500: "primary",
  2000: "info",
  Infinity: "success",
}

// Sort the keys in case they are not in order
const membersCountLabelsKeys = compose(sortBy(gt), keys)(membersCountLabelsMap)

function getMembersCountClass(membersCount) {
  for (let i = 0; i < membersCountLabelsKeys.length; i++) {
    const key = membersCountLabelsKeys[i]
    if (membersCount < key) {
      return membersCountLabelsMap[key]
    }
  }

  return "default"
}

export function MembersCountTag({membersCount, style}) {
  return (
    <span
      className={`label label-${getMembersCountClass(membersCount)}`}
      style={style}
    >{membersCount}</span>
  )
}

MembersCountTag.propTypes = {
  membersCount: PropTypes.number,
  style: PropTypes.object,
}
