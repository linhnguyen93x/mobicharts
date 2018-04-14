import 'rxjs/Rx'

import * as React from 'react'
import { Provider } from 'react-redux'
import { applyMiddleware, createStore } from 'redux'
import { createEpicMiddleware } from 'redux-observable'
import { MAIN_LOADER, SUBMIT_LOADER } from 'src/+state/constants'
import AppEpic from 'src/+state/epics'
import AppReducer from 'src/+state/reducers'
import api from 'src/api'
import AppWithNavigationState from 'src/navigators/AppNavigator'
import { LoadingComponent } from 'src/shared/HOC/LoadingComponent'
import { middleware } from 'src/shared/redux'

const epicMiddleware = createEpicMiddleware(AppEpic, { dependencies: api })

const MainComponent = LoadingComponent(AppWithNavigationState, [MAIN_LOADER, SUBMIT_LOADER])

export default class App extends React.Component<any, any> {
  store = createStore(AppReducer, applyMiddleware(middleware, epicMiddleware))

  render() {

    return (
      <Provider store={this.store}>
        <MainComponent />
      </Provider>
    )
  }
}
