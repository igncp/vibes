const CLIENT_ID_PROD = "9t3hah3e4qq4gv3lk5v54s0lds"
const CLIENT_ID_DEV = "cirsaosvso7bda1ls8tuj1m8ng"

const CLIENT_ID = (process.env.NODE_ENV === "production")
  ? CLIENT_ID_PROD
  : CLIENT_ID_DEV

export const getCurrentAccessToken = ({url}) => () => {
  const results = /access_token=(.+)&?/g.exec(url)

  if (!results || !results[1]) return null

  return `access_token=${results[1]}`
}

export const redirectToAuth = ({redirect, wait, url}) => () => {
  wait(() => {
    redirect(
      "https://secure.meetup.com/oauth2/authorize"
        + "?response_type=token"
        + `&client_id=${CLIENT_ID}`
        + `&redirect_uri=${url}`
        + "&scope=basic"
    )
  }, 1000)
}
