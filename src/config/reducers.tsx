import { NavigationActions } from 'react-navigation'
import { Action, combineReducers, Reducer } from 'redux'
import todos from 'src/modules/todos'
import { State as TodoState } from 'src/modules/todos/model'

import { AppNavigator } from '../navigators/AppNavigator'

const ActionForLoggedOut = AppNavigator.router.getActionForPathAndParams(
  'Login'
)
const ActionForLoggedIn = AppNavigator.router.getActionForPathAndParams('Main')

const stateForLoggedOut = AppNavigator.router.getStateForAction(
  ActionForLoggedOut
)
const stateForLoggedIn = AppNavigator.router.getStateForAction(
  ActionForLoggedIn
)
const initialNavState = { stateForLoggedOut, stateForLoggedIn }

function nav(state = initialNavState, action: Action) {
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

export interface IApplicationState {
  [todos.constants.NAME]: TodoState
}

const AppReducer: Reducer<IApplicationState> = combineReducers<IApplicationState>({
  nav,
  auth,
  [todos.constants.NAME]: todos.reducer
})

export default AppReducer
