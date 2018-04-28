import { TLoginActionSuccess } from '../Login/actionTypes'
import { LOGIN_SUCCESS } from '../Login/constants'
import { TCheckAuthSuccess } from './actionTypes'
import { CHECK_AUTH_SUCCESS } from './constants'

const initialProfileState = null

function profile(state = initialProfileState, action: TLoginActionSuccess | TCheckAuthSuccess) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return action.payload
    case CHECK_AUTH_SUCCESS:
      return action.payload
    default:
      return state
  }
}

export default profile
