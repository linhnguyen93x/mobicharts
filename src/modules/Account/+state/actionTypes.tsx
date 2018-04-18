import { Action } from 'redux'

import { UserProfile } from '../+model/profile'

// tslint:disable-next-line:no-empty-interface
export interface TCheckAuth extends Action {
  token: string
}

export interface TCheckAuthSuccess extends Action {
  payload: UserProfile
}
