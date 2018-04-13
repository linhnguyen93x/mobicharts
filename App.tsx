import * as React from 'react'
import { Provider } from 'react-redux'
import { applyMiddleware, createStore } from 'redux'
import { MAIN_LOADER } from 'src/+state/constants'
import AppReducer from 'src/+state/reducers'
import AppWithNavigationState from 'src/navigators/AppNavigator'
import { LoadingComponent } from 'src/shared/HOC/LoadingComponent'
import { middleware } from 'src/shared/redux'

const MainComponent = LoadingComponent(AppWithNavigationState, [MAIN_LOADER])

export default class App extends React.Component<any, any> {
  store = createStore(AppReducer, applyMiddleware(middleware))

  render() {

    return (
      <Provider store={this.store}>
        <MainComponent />
      </Provider>
    )
  }
}
