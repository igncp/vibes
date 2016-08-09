import {redirectToAuthWithoutDeps, getCurrentAccessTokenWithoutDeps, logoutWithoutDeps} from "./auth"
import {getApi} from "./api"

const {getJSON} = $

const url = window.location.href
const redirect = window.location.replace.bind(window.location)
const alert = window.alert
const reload = window.location.reload.bind(window.location)
const ls = window.localStorage
const delay = window.setTimeout

export const api = getApi({get: getJSON})

export const auth = {
  getCurrentAccessToken: getCurrentAccessTokenWithoutDeps({url, redirect, alert, reload, ls, delay}),
  logout: logoutWithoutDeps({ls, reload}),
  redirectToAuth: redirectToAuthWithoutDeps({redirect, url}),
}

export {timestampToDate} from "./timestampToDate"
