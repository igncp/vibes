import React, {PropTypes} from "react"

import {BaseLayout} from "../../components/BaseLayout"
import {NavBarButton} from "../../components/NavBarButton"

import {auth} from "../../utils"

export function Authenticated({children}) {
  return (
    <BaseLayout
      navBarButtons={[
        <NavBarButton
          key="profile-button"
          link="profile"
        >Profile</NavBarButton>,
        <NavBarButton
          key="logout-button"
          onClick={auth.logout}
        >Log Out</NavBarButton>,
      ]}
    >
      {children}
    </BaseLayout>
  )
}

Authenticated.propTypes = {
  children: PropTypes.node.isRequired,
}
