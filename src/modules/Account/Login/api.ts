import { Observable } from 'rxjs/Observable'
import { api } from 'src/api'

import { UserProfile } from '../+model'
import { LoginRequest } from './model'

// Define api here
export const login = (body: LoginRequest): Observable<UserProfile> => {
  return api.request('/mobile/export/auth.html', body)
}
