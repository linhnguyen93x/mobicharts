import { NavigationActions } from 'react-navigation'
import { Action, combineReducers, Reducer } from 'redux'
import { loadingReducer } from 'src/+state/loadingReducer'
import profile from 'src/modules/Account/+state/reducers'
import SummaryChart from 'src/modules/ChartTab'
import { SummaryChartState } from 'src/modules/ChartTab/model'

import { AppNavigator } from '../navigators/AppNavigator'

const ActionForLoggedOut = AppNavigator.router.getActionForPathAndParams(
  'Login'
)
const ActionForLoggedIn = AppNavigator.router.getActionForPathAndParams('Main/Chart')
const stateForLoggedOut = AppNavigator.router.getStateForAction(
  ActionForLoggedOut
)
const stateForLoggedIn = AppNavigator.router.getStateForAction(
  {}
)
const initialNavState = { stateForLoggedOut, stateForLoggedIn }
function nav(state = initialNavState, action: Action) {
  console.info('[ACTION]:', action.type)

  switch (action.type) {
    case '@@redux/INIT':
      return initialNavState

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

const initialAuthState = { isLoggedIn: null }
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
  [SummaryChart.constants.NAME]: SummaryChartState
}

const AppReducer: Reducer<IApplicationState> = combineReducers<IApplicationState>({
  nav,
  auth,
  profile,
  loading: loadingReducer,
  [SummaryChart.constants.NAME]: SummaryChart.reducer
})

export default AppReducer
