import { api } from 'src/api'

import { login } from './Login/api'

const getUserProfile = () => {
  return api.request('')
}

export const AccountApi = {
    getUserProfile,
    login
}
