import { Action } from 'redux'
import { UserProfile } from 'src/+model/profile'

export interface TLoginAction extends Action {
  payload: {
    userName: string
    password: string
  }
}

export interface TLoginActionSuccess extends Action {
  payload: UserProfile
}
