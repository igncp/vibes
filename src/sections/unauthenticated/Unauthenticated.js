import React from "react"

import {BaseLayout} from "../../components/BaseLayout"
import {NavBarButton} from "../../components/NavBarButton"
import {auth} from "../../utils"

export function Unauthenticated() {
  return (
    <BaseLayout
      navBarButtons={[
        <NavBarButton
          key="redirectToAuth-button"
          onClick={auth.redirectToAuth}
        >Log In</NavBarButton>,
      ]}
    >
      <div>
        <p>You are not logged in. If you were logged in before, your token might have expired.</p>
        <p>You will have to log in via the Meetup website. Just click in the button of the nav bar to continue. The sessions last for one hour.</p>
      </div>
    </BaseLayout>
  )
}

Unauthenticated.propTypes = {}
