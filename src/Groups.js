import React, {Component, PropTypes} from "react"

import {api} from "./utils"

import {Button} from "./Button"

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

export class Groups extends Component {
  static propTypes = {
    token: PropTypes.string,
  }

  constructor() {
    super()

    this.state = {
      form: {
        postcode: null,
      },
      groups: [],
    }
  }

  handleSearch = () => {
    const postcode = this.state.form.postcode
    const token = this.props.token

    api.findGroups({postcode, token})
      .then(groups => this.setState({groups}))
  }

  handleClear = () => {
    this.setState({
      groups: [],
    })
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
          <GroupsList groups={this.state.groups} />
        </div>
      </div>
    )
  }
}
