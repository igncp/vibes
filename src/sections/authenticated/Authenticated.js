import React from "react"
import {observer} from "mobx-react"

import {Groups} from "./sections/groups/Groups"
import {SimpleLayout} from "../../components/SimpleLayout"

export const Authenticated = observer(function() {
  return (
    <SimpleLayout>
      <Groups />
    </SimpleLayout>
  )
})
