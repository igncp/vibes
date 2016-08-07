import React, {Component} from "react"
import {observer} from "mobx-react"

import {domainStore} from "../../../../stores"

import {api} from "../../../../utils"

import {Button} from "../../../../components/Button"
import {Spinner} from "../../../../components/spinner/Spinner"

import {GroupsList} from "./components/GroupsList"

const styles = getInlineStyles()

@observer
export class Groups extends Component {
  constructor() {
    super()

    this.state = {
      isFetching: false,
      query: {
        postcode: null,
        offset: null,
      },
      form: {
        postcode: null,
      },
    }
  }

  componentWillMount() {
    window.addEventListener("scroll", this.scrollListener)
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.scrollListener)
  }

  scrollListener = () => {
    const SCROLL_GAP = 300
    if ((window.innerHeight + window.scrollY) >= (document.body.scrollHeight - SCROLL_GAP)) {
      if (!this.state.isFetching) {
        const offset = this.state.query.offset + 1
        const postcode = this.state.query.postcode
        this.setState({
          query: {postcode, offset},
        })

        this.findGroups({postcode, offset})
      }
    }
  }

  findGroups = ({postcode, offset}) => {
    this.setState({isFetching: true})

    api.findGroups({postcode, offset})
      .then((groups) => {
        domainStore.actions.concatGroups(groups)
        this.setState({isFetching: false})
      })
  }

  handleSearch = () => {
    const postcode = this.state.form.postcode
    const offset = 0

    if (!postcode) return

    this.setState({
      query: {postcode, offset},
    })

    this.findGroups({postcode, offset})
  }

  handleClear = () => {
    domainStore.actions.resetGroups()
    this.setState({
      form: {postcode: ""},
      query: null,
    })
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
    const groups = domainStore.groups.slice()

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
          {groups.length ? (
            <p>Groups displayed: {groups.length}</p>
          ) : null}
          <GroupsList groups={groups} />
        </div>
        {!!this.state.isFetching && domainStore.groups.length > 0 ? (
          <Spinner />
        ) : null}
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
