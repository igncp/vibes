import React from "react"

import {domainStore} from "./stores"
import {auth} from "./utils"

domainStore.actions.setToken(auth.getCurrentAccessToken())

import {AppRouter} from "./AppRouter"

export function App() {
  return (
    <AppRouter />
  )
}
