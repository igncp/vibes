import React, {Component} from "react"
import {observer} from "mobx-react"

import {domainStore} from "../../../../stores"

import {api} from "../../../../utils"

import {Spinner} from "../../../../components/spinner/Spinner"
import {ShowcasePhoto} from "../../../../components/ShowcasePhoto"

@observer
export class Profile extends Component {
  constructor() {
    super()

    this.state = {
      isFetching: false,
    }
  }

  componentWillMount() {
    if (!domainStore.profile) {
      this.setState({isFetching: true})

      api.getSelfProfile()
        .then(profile => {
          this.setState({isFetching: false})
          domainStore.actions.setProfile(profile)
        })
    }
  }

  getProfileContent() {
    const {name, id, bio, status, joined, city, country, state, lat, lon, photo} = domainStore.profile

    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title">
            {name}
          </h3>
        </div>
        <div className="panel-body">
          <p>id: {id}</p>
          <p>Bio: {bio}</p>
          <p>Status: {status}</p>
          <p>Joined: {joined}</p>
          <p>City: {city}</p>
          <p>State: {state}</p>
          <p>Country: {domainStore.profile.localized_country_name} [{country}]</p>
          <p>Latitude: {lat}</p>
          <p>Longitude: {lon}</p>
          <ShowcasePhoto src={photo ? photo.photo_link : null} />
        </div>
      </div>
    )
  }

  render() {
    return this.state.isFetching || !domainStore.profile ? (
      <Spinner />
    ) : (
      this.getProfileContent()
    )
  }
}
