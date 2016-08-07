import {observable, action} from "mobx"

import {whereEq, find} from "ramda"

export const domainStore = {
  @observable token: null,
  @observable profile: null,
  @observable groups: [],
  @observable groupDetail: null,
}

domainStore.actions = {
  @action setToken: token => domainStore.token = token,
  @action resetGroups: () => domainStore.groups = [],
  @action concatGroups: groups => domainStore.groups = domainStore.groups.concat(groups),
  @action setGroupDetail: groupDetail => domainStore.groupDetail = groupDetail,
  @action setProfile: profile => domainStore.profile = profile,
  @action setGroupDetailFromGroups: (urlname, onNotFound) => {
    const findGroup = find(whereEq({urlname}))
    const group = findGroup(domainStore.groups)

    if (!group) onNotFound()
    else domainStore.groupDetail = group
  },
}
