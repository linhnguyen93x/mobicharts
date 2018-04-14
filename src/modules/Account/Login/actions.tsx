import { ActionCreator } from 'redux'

import { TLoginAction, TLoginActionSuccess } from './actionTypes'
import { LOGIN_REQUEST, LOGIN_SUCCESS } from './constants'

export const loginAction: ActionCreator<TLoginAction> = ({userName, password}) => ({
  type: LOGIN_REQUEST,
  payload: {
    userName,
    password
  }
})

export const loginSuccess: ActionCreator<TLoginActionSuccess> = (result: object) => ({
  type: LOGIN_SUCCESS,
  payload: {}
})

export const navigateToUser: ActionCreator<{}>  = () => {
  return {
    type: 'Login'
  }
}
