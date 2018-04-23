import { api } from 'src/api'

import { login } from './Login/api'

const getUserProfile = () => {
  return api.request('/mobile/export/getProfile.html')
}

export const AccountApi = {
    getUserProfile,
    login
}
