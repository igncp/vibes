export const getCurrentAccessToken = ({url}) => () => {
  const results = /access_token=(.+)&/g.exec(url)

  if (!results) return null
  if (!results[1]) return null

  return `access_token=${results[1]}`
}

export const redirectToAuth = ({redirect, wait, url}) => () => {
  wait(() => {
    redirect(
      "https://secure.meetup.com/oauth2/authorize"
        + "?response_type=token"
        + "&client_id=9t3hah3e4qq4gv3lk5v54s0lds"
        + `&redirect_uri=${url}`
        + "&scope=basic"
    )
  }, 1000)
}
