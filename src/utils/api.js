const API_URL = "https://api.meetup.com/"

export const findGroups = ({get}) => ({postcode, token}) => {
  return get(`${API_URL}find/groups?photo-host=public&zip=${postcode}&page=20&${token}`)
}
