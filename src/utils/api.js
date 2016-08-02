import {domainStore} from "../stores"

const API_URL = "https://api.meetup.com/"

export const findGroups = ({get}) => ({postcode}) => {
  const token = domainStore.token

  return get(`${API_URL}find/groups?photo-host=public&zip=${postcode}&page=20&${token}`)
}
