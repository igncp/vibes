import React, {Component, PropTypes} from "react"
import {observer} from "mobx-react"

import {domainStore} from "../../../../stores"

import {api} from "../../../../utils"

import {Button} from "../../../../components/Button"

function GroupsList({groups}) {
  return (
    <div>{groups.map((group) => {
      return (
        <p key={group.id}>{group.name}</p>
      )
    })}</div>
  )
}
GroupsList.propTypes = {
  groups: PropTypes.array,
}

@observer
export class Groups extends Component {
  constructor() {
    super()

    this.state = {
      form: {
        postcode: null,
      },
    }
  }

  handleSearch = () => {
    const postcode = this.state.form.postcode

    if (!postcode) return

    api.findGroups({postcode})
      .then(groups => domainStore.actions.setGroups(groups))
  }

  handleClear = () => {
    domainStore.actions.resetGroups()
  }

  render() {
    return (
      <div>
        <p>Enter your postcode:</p>
        <p>
          <input
            onChange={e => this.setState({form: {postcode: e.target.value}})}
            type="text"
            value={this.state.form.postcode || ""}
          />
        </p>
        <p>
          <Button onClick={this.handleSearch}>Search</Button>
          <span> </span>
          <Button onClick={this.handleClear}>Clear</Button>
        </p>
        <div>
          <GroupsList groups={domainStore.groups.slice()} />
        </div>
      </div>
    )
  }
}

