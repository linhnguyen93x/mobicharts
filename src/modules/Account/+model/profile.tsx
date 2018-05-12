export interface UserProfile {
  username: string
  email: string
  enabled: boolean
  authorities: string[]
  code: string
  fullName: string
  firstName: string
  lastName: string
  phoneNumber: string
  customerId: number
  customerCode: string
  needChangePassword: boolean
  newCycleId: number
  announcement: string
  jwt: string
  levelReport: string
  showTabReport: TabInfo[]
}

export interface IFilter {
  CT: string
  CN: string
  LQ: string
  Q: string
}
export interface TabInfo {
  showAll: boolean
  code: keyof IFilter
}
