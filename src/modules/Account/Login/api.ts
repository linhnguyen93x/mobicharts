import { api } from 'src/api'

import { LoginRequest } from './model'

// Define api here
const login = (body: LoginRequest) => {
  return api.request('/api/auth.html', body)
}

export const LoginApi = {
    login
}
