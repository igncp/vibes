import React, {Component, PropTypes} from "react"
import {compose, replace, merge} from "ramda"

import {observer} from "mobx-react"

import {api, timestampToDate} from "../../../../utils"
import {domainStore} from "../../../../stores"

import {Button} from "../../../../components/Button"
import {MembersCountTag} from "../../components/MembersCountTag"
import {Spinner} from "../../../../components/spinner/Spinner"
import {ShowcasePhoto} from "../../../../components/ShowcasePhoto"
import {EmbeddedMap} from "../../../../components/EmbeddedMap"

const parseDescription = compose(
  replace(/<\/?(p|span|br|b|strong|a|i)(.*?)>/g, ""),
  replace(/&(nbsp|amp);/g, ""),
)

const inlineStyles = getInlineStyles()

@observer
export class GroupDetail extends Component {
  constructor() {
    super()

    this.state = {
      isFetchingPage: false,
      isFetchingEventDetail: false,
    }
  }

  componentWillMount() {
    const {groupDetail} = domainStore
    const {urlname} = this.props.params

    if (!groupDetail || groupDetail.urlname !== urlname) {
      const group = domainStore.actions.getGroupDetailFromGroups(urlname)

      if (!group) {
        this.fetchGroupDetail().then(this.fetchEventDetail)
      } else {
        domainStore.actions.setGroupDetail(group)
        if (!group.nextEventDetail) this.fetchEventDetail()
      }
    }
  }

  fetchEventDetail = () => {
    const {urlname} = this.props.params
    const {groupDetail} = domainStore

    if (!groupDetail.next_event) return

    const {id} = groupDetail.next_event

    this.setState({isFetchingEventDetail: true})

    api.findEventDetail({urlname, id})
      .then(nextEventDetail => {
        domainStore.actions.setGroupDetail(merge(domainStore.groupDetail, {nextEventDetail}))
        this.setState({isFetchingEventDetail: false})
      })
  }

  fetchGroupDetail = () => {
    const {urlname} = this.props.params

    this.setState({isFetchingPage: true})

    return api.findGroupDetail({urlname})
      .then(group => {
        domainStore.actions.setGroupDetail(group)
        this.setState({isFetchingPage: false})
      })
  }

  getNextEventComp = () => {
    const groupDetail = domainStore.groupDetail

    if (!groupDetail.next_event || !groupDetail.nextEventDetail) return (
      <p><strong>There are not planned meetups for this group</strong></p>
    )

    const {nextEventDetail} = groupDetail

    return (
      <div>
        <p><strong>Next event:</strong></p>
        <p>{nextEventDetail.name} - <strong>{timestampToDate(groupDetail.next_event.time)}</strong></p>
        {nextEventDetail.venue ? (
          <div>
            <p>Location: {nextEventDetail.venue.name}{nextEventDetail.venue.address_1 ? `: ${nextEventDetail.venue.address_1}` : ""}</p>
            <p style={inlineStyles.eventDescription}>{parseDescription(nextEventDetail.description)}</p>
            <EmbeddedMap query={`${nextEventDetail.venue.lat},${nextEventDetail.venue.lon}`} />
          </div>
        ) : (
          <p>You can't see the place of this meetup</p>
        )}
      </div>
    )
  }

  // Not using `dangerouslySetInnerHTML` for groupDetail.description
  // even if it is coming from Meetup (expectedly "safe")
  render() {
    const groupDetail = domainStore.groupDetail

    return (
      <div>
        {(!groupDetail || this.state.isFetchingPage) ? (
          <Spinner />
        ) : (
          <div>
            <div className="panel panel-default">
              <div className="panel-heading">
                <h3 className="panel-title">
                  {groupDetail.name}
                  <MembersCountTag
                    membersCount={groupDetail.members}
                    style={inlineStyles.membersCountTag}
                  />
                </h3>
              </div>
              <div className="panel-body">
                <p style={inlineStyles.description}>{parseDescription(groupDetail.description)}</p>
                <ShowcasePhoto src={groupDetail.key_photo ? groupDetail.key_photo.photo_link : null} />
                {this.state.isFetchingEventDetail ? (
                  <Spinner />
                ) : this.getNextEventComp()}
                <p><Button onClick={() => window.open(groupDetail.link)}>Open in Meetup</Button></p>
              </div>
            </div>
            <div>
              <p><Button link="/">Back to groups</Button></p>
            </div>
          </div>
        )}
      </div>
    )
  }
}

GroupDetail.propTypes = {
  params: PropTypes.object,
}

function getInlineStyles() {
  const commonDescription = {
    lineHeight: "30px",
    textAlign: "justify",
    overflow: "auto",
  }

  return {
    description: merge(commonDescription, {
      maxHeight: 200,
      textIndent: 15,
      marginBottom: 20,
    }),
    eventDescription: merge(commonDescription, {
      maxHeight: 100,
    }),
    membersCountTag: {
      position: "absolute",
      right: 30,
    },
  }
}
