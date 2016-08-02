import React from "react"

import {Authenticated} from "./sections/authenticated/Authenticated"
import {Unauthenticated} from "./sections/unauthenticated/Unauthenticated"

import {domainStore} from "./stores"

import {auth} from "./utils"

const {redirectToAuth, getCurrentAccessToken} = auth
domainStore.actions.setToken(getCurrentAccessToken())

if (!domainStore.token) redirectToAuth()

export function App() {
  const Component = (!domainStore.token)
    ? Unauthenticated
    : Authenticated

  return (
    <Component />
  )
}
