import React, {Component, PropTypes} from "react"

export class Authenticated extends Component {
  static propTypes = {
    token: PropTypes.string,
  }

  constructor() {
    super()

    this.state = {
      form: {
        postcode: null,
      },
    }
  }

  handleClick = (e) => {
    e.preventDefault()
    $.getJSON(`https://api.meetup.com/find/groups?photo-host=public&zip=${this.state.form.postcode}&page=20&${this.props.token}`)
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
          <a
            href="#"
            onClick={this.handleClick}
          >Search</a>
        </p>
      </div>
    )
  }
}
