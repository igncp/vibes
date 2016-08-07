import React, {Component, PropTypes} from "react"
import {compose, replace} from "ramda"

import {observer} from "mobx-react"

import {api} from "../../../../utils"
import {domainStore} from "../../../../stores"

import {Button} from "../../../../components/Button"
import {MembersCountTag} from "../../components/MembersCountTag"
import {Spinner} from "../../../../components/spinner/Spinner"

const parseDescription = compose(
  replace(/<\/?(p|span|br|b|strong|a)(.*?)>/g, ""),
  replace(/&(nbsp|amp);/g, ""),
)

const inlineStyles = getInlineStyles()

@observer
export class GroupDetail extends Component {
  constructor() {
    super()

    this.state = {
      isFetching: false,
    }
  }

  componentWillMount() {
    const {groupDetail} = domainStore
    const {urlname} = this.props.params

    if (!groupDetail || groupDetail.urlname !== urlname) {
      domainStore.actions.setGroupDetailFromGroups(urlname, this.fetchGroupDetail)
    }
  }

  fetchGroupDetail = () => {
    const {urlname} = this.props.params
    this.setState({isFetching: true})

    api.findGroupDetail({urlname})
      .then((group) => {
        domainStore.actions.setGroupDetail(group)
        this.setState({isFetching: false})
      })
  }

  // Not using `dangerouslySetInnerHTML` for groupDetail.description
  // even if it is coming from Meetup (expectedly "safe")
  render() {
    const groupDetail = domainStore.groupDetail

    return (
      <div>
        {(!groupDetail || this.state.isFetching) ? (
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
                {groupDetail.key_photo && groupDetail.key_photo.photo_link ? (
                  <p style={inlineStyles.groupPhotoWrapper}>
                    <img
                      src={groupDetail.key_photo.photo_link}
                      style={inlineStyles.groupPhoto}
                    />
                  </p>
                ) : null}
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
  return {
    description: {
      textAlign: "justify",
      textIndent: 15,
      lineHeight: "30px",
    },
    membersCountTag: {
      position: "absolute",
      right: 30,
    },
    groupPhotoWrapper: {
      textAlign: "center",
    },
    groupPhoto: {
      borderRadius: 10,
      maxWidth: 300,
      boxShadow: "0 0 10px 1px #aaa",
    },
  }
}
