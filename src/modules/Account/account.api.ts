import { api } from 'src/api'

import { LoginApi } from './Login/api'

// Define api here
const getUserProfile = (url: string) => {
  return api.request(url)
}

export const AccountApi = {
    getUserProfile,
    ...LoginApi
}
