import {getJSON} from "jquery"

import {redirectToAuth, getCurrentAccessToken} from "./auth"
import {findGroups} from "./api"

const url = window.location.href

export const api = {
  findGroups: findGroups({get: getJSON}),
}

export const auth = {
  redirectToAuth: redirectToAuth({redirect: window.location.replace.bind(window.location), wait: setTimeout, url}),
  getCurrentAccessToken: getCurrentAccessToken({url}),
}
