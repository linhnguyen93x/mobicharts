import * as React from 'react'
import { Provider } from 'react-redux'
import { applyMiddleware, createStore } from 'redux'
import AppReducer from 'src/config/reducers'
import AppWithNavigationState from 'src/navigators/AppNavigator'
import { middleware } from 'src/shared/redux'

export default class App extends React.Component<any, any> {
  store = createStore(AppReducer, applyMiddleware(middleware))

  render() {

    return (
      <Provider store={this.store}>
        <AppWithNavigationState />
      </Provider>
    )
  }
}
