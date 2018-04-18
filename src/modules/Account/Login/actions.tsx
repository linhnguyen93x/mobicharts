import { ActionCreator } from 'redux'

import { UserProfile } from '../+model'
import { TLoginAction, TLoginActionSuccess } from './actionTypes'
import { LOGIN_REQUEST, LOGIN_SUCCESS } from './constants'

export const loginAction: ActionCreator<TLoginAction> = ({userName, password}) => ({
  type: LOGIN_REQUEST,
  payload: {
    userName,
    password
  }
})

export const loginSuccess: ActionCreator<TLoginActionSuccess> = (result: UserProfile) => ({
  type: LOGIN_SUCCESS,
  payload: result
})

export const navigateToUser: ActionCreator<{}>  = () => {
  return {
    type: 'Login'
  }
}
