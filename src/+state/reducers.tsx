import { NavigationActions } from 'react-navigation'
import { Action, combineReducers, Reducer } from 'redux'
import { loadingReducer } from 'src/+state/loadingReducer'
import { UserProfile } from 'src/modules/Account/+model'
import profile from 'src/modules/Account/+state/reducers'
import SummaryChart from 'src/modules/ChartTab'
import { SummaryChartState } from 'src/modules/ChartTab/model'
import MapTab from 'src/modules/MapTab'
import { MapState } from 'src/modules/MapTab/model'
import ReportDetail from 'src/modules/ReportDetail'
import { ReportDetailState } from 'src/modules/ReportDetail/model'

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
  profile: UserProfile | null
  [SummaryChart.constants.NAME]: SummaryChartState
  [ReportDetail.constants.NAME]: ReportDetailState
  [MapTab.constants.NAME]: MapState
}

const AppReducer: Reducer<IApplicationState> = combineReducers<IApplicationState>({
  nav,
  auth,
  profile,
  loading: loadingReducer,
  [SummaryChart.constants.NAME]: SummaryChart.reducer,
  [ReportDetail.constants.NAME]: ReportDetail.reducer,
  [MapTab.constants.NAME]: MapTab.reducer
})

export default AppReducer
