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
  showTabReport: string[]
}
