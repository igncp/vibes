import {__, compose, invoker, divide, subtract} from "ramda"

const CLIENT_ID_PROD = "9t3hah3e4qq4gv3lk5v54s0lds"
const CLIENT_ID_DEV = "cirsaosvso7bda1ls8tuj1m8ng"

const CLIENT_ID = (process.env.NODE_ENV === "production")
  ? CLIENT_ID_PROD
  : CLIENT_ID_DEV

function getParameterByName(name) {
  const url = window.location.href

  name = name.replace(/[\[\]]/g, "\\$&")

  const regex = new RegExp("[#?&]" + name + "(=([^&#]*)|&|#|$)")
  const results = regex.exec(url)

  if (!results) return null
  if (!results[2]) return ""

  return decodeURIComponent(results[2].replace(/\+/g, " "))
}

function resetTokenInfo(ls) {
  ls.removeItem("accessToken")
  ls.removeItem("tokenExpiresIn")
  ls.removeItem("tokenCreatedAt")
}

export const logoutWithoutDeps = ({reload, ls}) => () => {
  resetTokenInfo(ls)
  reload()
}

export const getCurrentAccessTokenWithoutDeps = ({redirect, url, alert, reload, ls, delay}) => () => {
  const logout = logoutWithoutDeps({reload, ls})
  const urlAccessToken = getParameterByName("access_token")
  const currentTime = new Date().getTime()

  if (urlAccessToken) {
    const expiresIn = getParameterByName("expires_in")

    ls.setItem("accessToken", urlAccessToken)
    ls.setItem("tokenExpiresIn", expiresIn)
    ls.setItem("tokenCreatedAt", currentTime)

    redirect(url.replace(/access_token=.+&token_type=.+&expires_in=.+/, ""))
  }

  const savedAccessToken = ls.getItem("accessToken")
  const savedTokenExpiresIn = ls.getItem("tokenExpiresIn")
  const savedTokenCreatedAt = ls.getItem("tokenCreatedAt")

  if (!savedTokenExpiresIn || !savedTokenCreatedAt || !savedAccessToken) {
    resetTokenInfo(ls)

    return null
  }

  const secondsDiff = compose(
    subtract(Number(savedTokenExpiresIn)),
    Number,
    invoker(1, "toFixed")(0),
    divide(__, 1000),
    subtract(currentTime),
    Number
  )(savedTokenCreatedAt)

  if (secondsDiff < 0) {
    resetTokenInfo(ls)

    return null
  }

  delay(function() {
    alert("Your session has expired, you will be logged out")
    logout()
  }, secondsDiff * 1000)

  return `access_token=${savedAccessToken}`
}

export const redirectToAuthWithoutDeps = ({redirect, url}) => () => {
  redirect(
    "https://secure.meetup.com/oauth2/authorize"
      + "?response_type=token"
      + `&client_id=${CLIENT_ID}`
      + `&redirect_uri=${url}`
      + "&scope=basic"
  )
}
