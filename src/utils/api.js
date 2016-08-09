import {compose, contains} from "ramda"

import {domainStore} from "../stores"

const API_URL = "https://api.meetup.com/"

const buildRequestUrl = (uri, token) => {
  const separator = contains("?", uri) ? "&" : "?"
  return `${API_URL}${uri}${separator}${token}`
}

export const getApi = ({get}) => {
  const getUrl = compose(get, buildRequestUrl)

  return {
    findGroups: ({postcode, offset}) => {
      const PAGES_PER_REQUEST = 20
      return getUrl(
        `find/groups?photo-host=public&zip=${postcode}&page=${PAGES_PER_REQUEST}&offset=${offset}`,
        domainStore.token
      )
    },
    findGroupDetail: ({urlname}) => getUrl(`${urlname}`, domainStore.token),
    findEventDetail: ({urlname, id}) => getUrl(`${urlname}/events/${id}`, domainStore.token),
    getSelfProfile: () => getUrl("members/self", domainStore.token),
  }
}

