import { api } from 'src/api'

// Define api here
const getUserProfile = (url: string) => {
  return api.request(url)
}

export const AccountApi = {
    getUserProfile
}
