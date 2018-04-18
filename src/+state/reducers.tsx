import { NavigationActions } from 'react-navigation'
import { Action, combineReducers, Reducer } from 'redux'
import { loadingReducer } from 'src/+state/loadingReducer'
import profile from 'src/modules/Account/+state/reducers'

import { AppNavigator } from '../navigators/AppNavigator'

const ActionForLoggedOut = AppNavigator.router.getActionForPathAndParams(
  'Login'
)
const ActionForLoggedIn = AppNavigator.router.getActionForPathAndParams('Main/Chart')
const stateForLoggedOut = AppNavigator.router.getStateForAction(
  ActionForLoggedOut
)
const stateForLoggedIn = AppNavigator.router.getStateForAction(
  ActionForLoggedIn
)
const initialNavState = { stateForLoggedOut, stateForLoggedIn }
function nav(state = initialNavState, action: Action) {
  console.info('[ACTION]:', action.type)

  switch (action.type) {
    case '@@redux/INIT':
      return {
        ...state,
        stateForLoggedIn: AppNavigator.router.getStateForAction(
          ActionForLoggedIn
        )
      }

    case 'Login':
      return {
        ...state,
        stateForLoggedIn: AppNavigator.router.getStateForAction(
          ActionForLoggedIn
        )
      }

    case 'Logout':
      return {
        ...state,
        stateForLoggedOut: AppNavigator.router.getStateForAction(
          NavigationActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'Login' })]
          })
        )
      }

    default:
      return {
        ...state,
        stateForLoggedIn: AppNavigator.router.getStateForAction(
          action,
          state.stateForLoggedIn
        )
      }
  }
}

const initialAuthState = { isLoggedIn: false }
function auth(state = initialAuthState, action: Action) {
  switch (action.type) {
    case 'Login':
      return { ...state, isLoggedIn: true }
    case 'Logout':
      return { ...state, isLoggedIn: false }
    default:
      return state
  }
}

// tslint:disable-next-line:no-empty-interface
export interface IApplicationState {
}

const AppReducer: Reducer<any> = combineReducers<any>({
  nav,
  auth,
  profile,
  loading: loadingReducer,
})

export default AppReducer
