export function getCurrentAccessToken() {
  const url = window.location.href
  const results = /access_token=(.+)&/g.exec(url)

  if (!results) return null
  if (!results[1]) return null

  return `access_token=${results[1]}`
}

export function redirectToAuth() {
  setTimeout(() => {
    window.location.replace(
      "https://secure.meetup.com/oauth2/authorize"
        + "?response_type=token"
        + "&client_id=9t3hah3e4qq4gv3lk5v54s0lds"
        + "&redirect_uri=http://localhost:8082"
        + "&scope=basic"
    )
  }, 1000)
}
