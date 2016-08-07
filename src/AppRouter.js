import React from "react"
import {Router, Route, IndexRoute, Redirect, hashHistory} from "react-router"

import {domainStore} from "./stores"

import {Unauthenticated} from "./sections/unauthenticated/Unauthenticated"

import {Authenticated} from "./sections/authenticated/Authenticated"

import {Groups} from "./sections/authenticated/sections/groups/Groups"
import {GroupDetail} from "./sections/authenticated/sections/group-detail/GroupDetail"
import {Profile} from "./sections/authenticated/sections/profile/Profile"

export function AppRouter() {
  return (
    <Router history={hashHistory}>
      {!!domainStore.token ? (
        <Route
          component={Authenticated}
          path="/"
        >
          <IndexRoute component={Groups} />
          <Route
            component={GroupDetail}
            path="group/:urlname"
          />
          <Route
            component={Profile}
            path="profile"
          />
        </Route>
      ) : (
        <Route
          component={Unauthenticated}
          path="/"
        >
          <Redirect
            from="*"
            to="/"
          />
        </Route>
      )}
    </Router>
  )
}
