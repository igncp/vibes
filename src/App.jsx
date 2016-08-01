import React, {Component} from "react"

import {Authenticated} from "./Authenticated"

import {auth} from "./utils"

const {getCurrentAccessToken, redirectToAuth} = auth

export class App extends Component {
  constructor() {
    super()

    this.state = {
      token: getCurrentAccessToken(),
    }
  }

  componentWillMount() {
    if (!this.state.token) redirectToAuth()
  }

  render() {
    if (!this.state.token) {
      return (
        <p>You will be requested to authorize</p>
      )
    }
    return (
      <Authenticated token={this.state.token} />
    )
  }
}
