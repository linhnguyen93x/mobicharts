import * as React from 'react'
import { BackHandler } from 'react-native'
import { addNavigationHelpers, NavigationActions, StackNavigator } from 'react-navigation'
import { connect } from 'react-redux'
import LoginScreen from '../components/Login'
import MainScreen from '../components/Main'
import { addListener } from '../shared/redux'

const fade = (props: any) => {
  const { position, scene } = props

  const index = scene.index

  const translateX = 0
  const translateY = 0

  const opacity = position.interpolate({
    inputRange: [index - 0.7, index, index + 0.7],
    outputRange: [0.3, 1, 0.3]
  })

  return {
    opacity,
    transform: [{ translateX }, { translateY }]
  }
}

export const AppNavigator = StackNavigator(
  {
    // Login: { screen: LoginScreen },
    Main: { screen: MainScreen }
  },
  {
    navigationOptions: (params: any) => ({
      gesturesEnabled: true,
      gesturesDirection: 'inverted',
    }),
    transitionConfig: () => ({
      screenInterpolator: (sceneProps) => {
        const { layout, position, scene } = sceneProps
        const { index } = scene
        const width = layout.initWidth

        return {
          opacity: position.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [ 0, 1, 0],
          }),
          transform: [{
            translateX: position.interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: [-width, 0, width],
            }),
          }]
        }
      },
      headerTitleInterpolator: (sceneProps: any) => {
        const { position, scene } = sceneProps
        const { index } = scene

        return {
          opacity: position.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [ 0, 1, 0],
          }),
          transform: [{
            translateX: position.interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: [-50, 0, 50],
            }),
          }]
        }
      }
    })
  }
)

class ReduxNavigation extends React.Component<any, {}> {
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress)
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress)
  }

  onBackPress = () => {
    const { dispatch, nav } = this.props
    if (nav.stateForLoggedIn.index <= 1) {
      BackHandler.exitApp()
      return
    }
    dispatch(NavigationActions.back())
    return true
  }

  render() {
    const { dispatch, nav, isLoggedIn } = this.props
    const state = isLoggedIn ? nav.stateForLoggedIn : nav.stateForLoggedOut
    const navigation = addNavigationHelpers({
      dispatch,
      state,
      addListener
    })

    return <AppNavigator navigation={navigation} />
  }
}

const mapStateToProps = (state: any) => ({
  nav: state.nav,
  isLoggedIn: state.auth.isLoggedIn
})

export default connect(mapStateToProps)(ReduxNavigation)
