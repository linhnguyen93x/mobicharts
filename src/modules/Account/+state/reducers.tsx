import { createSelector } from 'reselect'
import { IApplicationState } from 'src/+state/reducers'

import { UserProfile } from '../+model'
import { TLoginActionSuccess } from '../Login/actionTypes'
import { LOGIN_SUCCESS } from '../Login/constants'
import { TCheckAuthSuccess } from './actionTypes'
import { CHECK_AUTH_SUCCESS } from './constants'

const initialProfileState = null

function profile(state = initialProfileState, action: TLoginActionSuccess | TCheckAuthSuccess): UserProfile | null {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return action.payload
    case CHECK_AUTH_SUCCESS:
      return action.payload
    default:
      return state
  }
}

const getAll = (state: IApplicationState) => state.profile

export const getCompanyTab = createSelector(
  getAll,
  (all) => all ? all.showTabReport : []
)

export default profile
