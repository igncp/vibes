import React, {PropTypes} from "react"

import {MembersCountTag} from "../../../components/MembersCountTag"

import {Button} from "../../../../../components/Button"

const inlineStyles = getInlineStyles()

// Can't use the group.id as index as it gets repeated.
export function GroupsList({groups}) {
  return (
    <ul className="list-group">{groups.map((group, groupIndex) => {
      return (
        <Button
          extraClassName="list-group-item row"
          key={groupIndex}
          link={`/group/${group.urlname}`}
        >
          <span className="col-sm-2">
            <MembersCountTag
              membersCount={group.members}
              style={inlineStyles.membersCountTag}
            />
          </span>
          <span className="col-sm-10">{group.name}</span>
        </Button>
      )
    })}</ul>
  )
}

GroupsList.propTypes = {
  groups: PropTypes.array,
}


function getInlineStyles() {
  return {
    membersCountTag: {
      display: "inline-block",
      marginTop: 3,
    },
  }
}
