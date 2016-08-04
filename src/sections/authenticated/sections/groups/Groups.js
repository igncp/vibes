import React, {Component, PropTypes} from "react"
import {observer} from "mobx-react"

import {domainStore} from "../../../../stores"

import {api} from "../../../../utils"

import {Button} from "../../../../components/Button"
import {Spinner} from "../../../../components/spinner/Spinner"

const styles = getInlineStyles()

function GroupsList({groups}) {
  return (
    <ul className="list-group">{groups.map((group) => {
      return (
        <li
          className="list-group-item"
          key={group.id}
        >{group.name}</li>
      )
    })}</ul>
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
      isFetching: false,
      form: {
        postcode: null,
      },
    }
  }

  handleSearch = () => {
    const postcode = this.state.form.postcode

    if (!postcode) return

    this.setState({isFetching: true})
    api.findGroups({postcode})
      .then(groups => {
        domainStore.actions.setGroups(groups)
        this.setState({isFetching: false})
      })
  }

  handleClear = () => {
    domainStore.actions.resetGroups()
    this.setState({form: {postcode: ""}})
  }

  getSpinnerCompIfNecessary = () => {
    return this.state.isFetching ? (
      <div style={styles.spinnerWrapper}>
        <Spinner
          height={"50%"}
          width={"50%"}
        />
      </div>
    ) : null
  }

  getSearchButtonComp = () => {
    return (
      <div style={styles.searchButtonWrapper}>
        {this.getSpinnerCompIfNecessary()}

        <Button
          onClick={this.handleSearch}
          visibility={this.state.isFetching ? "hidden" : ""}
        >Search</Button>
      </div>
    )
  }

  render() {
    return (
      <div>
        <p>Enter your postcode to find groups:</p>
        <p>
          <input
            className="form-control"
            onChange={e => this.setState({form: {postcode: e.target.value}})}
            type="text"
            value={this.state.form.postcode || ""}
          />
        </p>
        <div>
          {this.getSearchButtonComp()}
          <span> </span>
          <Button onClick={this.handleClear}>Clear</Button>
        </div>
        <div style={styles.groupsListWrapper}>
          <GroupsList groups={domainStore.groups.slice()} />
        </div>
      </div>
    )
  }
}

function getInlineStyles() {
  return {
    spinnerWrapper: {
      width: 30,
      height: 30,
      position: "absolute",
      left: "40%",
      top: "30%",
    },
    searchButtonWrapper: {
      display: "inline-block",
      position: "relative",
    },
    groupsListWrapper: {
      marginTop: 20,
    },
  }
}
