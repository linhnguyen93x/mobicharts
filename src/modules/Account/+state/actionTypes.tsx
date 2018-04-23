import { Action } from 'redux'

import { UserProfile } from '../+model/profile'

export interface TCheckAuth extends Action {
  token: string
}

export interface TCheckAuthSuccess extends Action {
  payload: UserProfile
}

export interface TCheckAuthFail extends Action {
}
