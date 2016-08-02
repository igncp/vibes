import {observable, action} from "mobx"

export const domainStore = {
  @observable token: null,
  @observable groups: [],
}

domainStore.actions = {
  @action setToken: token => domainStore.token = token,
  @action resetGroups: () => domainStore.groups = [],
  @action setGroups: groups => domainStore.groups = groups,
}
