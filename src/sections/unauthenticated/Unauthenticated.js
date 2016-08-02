import React from "react"

import {SimpleLayout} from "../../components/SimpleLayout"

export function Unauthenticated() {
  return (
    <SimpleLayout>
      <p>You will be requested to login with Meetup in a few moments ...</p>
    </SimpleLayout>
  )
}
