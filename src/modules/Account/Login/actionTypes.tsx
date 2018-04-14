import { Action } from 'redux'

export interface TLoginAction extends Action {
  payload: {
    userName: string
    password: string
  }
}

export interface TLoginActionSuccess extends Action {
  payload: {}
}
