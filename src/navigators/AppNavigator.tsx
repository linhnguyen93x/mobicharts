import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons'
import * as React from 'react'
import { BackHandler, View } from 'react-native'
import { addNavigationHelpers, NavigationActions, StackNavigator, TabBarBottom, TabNavigator } from 'react-navigation'
import { connect } from 'react-redux'
import Login from 'src/modules/Account/Login'
import ChartTab from 'src/modules/ChartTab'
import MapTab from 'src/modules/MapTab'
import NotificationTab from 'src/modules/NotificationTab'

import PersonalTab from '../modules/PersonalTab'
import { addListener } from '../shared/redux'

// const fade = (props: any) => {
//   const { position, scene } = props

//   const index = scene.index

//   const translateX = 0
//   const translateY = 0

//   const opacity = position.interpolate({
//     inputRange: [index - 0.7, index, index + 0.7],
//     outputRange: [0.3, 1, 0.3]
//   })

//   return {
//     opacity,
//     transform: [{ translateX }, { translateY }]
//   }
// }

const TabBar = TabNavigator(
  {
    Chart: {
      screen: ChartTab.components.default,
      navigationOptions: {
        title: 'Báo cáo tổng hợp'
      }
    },
    Notification: { screen: NotificationTab },
    Map: { screen: MapTab },
    Account: { screen: PersonalTab }
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state
        let icon
        if (routeName === 'Chart') {
          const iconName = `bar-chart${focused ? '' : '-o'}`
          icon = <FontAwesome name={iconName} size={25} color={tintColor} />
        } else if (routeName === 'Notification') {
          const iconName = `bell${focused ? '' : '-outline'}`
          icon = <MaterialCommunityIcons name={iconName} size={25} color={tintColor} />
        } else if (routeName === 'Map') {
          const iconName = `map${focused ? '' : '-o'}`
          icon = <FontAwesome  name={iconName} size={25} color={tintColor} />
        } else if (routeName === 'Account') {
          const iconName = `user${focused ? '' : '-o'}`
          icon = <FontAwesome  name={iconName} size={25} color={tintColor} />
        }

        return <View>{icon}</View>
      }
    }),
    tabBarOptions: {
      activeTintColor: 'green',
      inactiveTintColor: 'gray',
      showLabel: false
    },
    animationEnabled: true,
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    swipeEnabled: false
  }
)

export const AppNavigator = StackNavigator(
  {
    Login: { screen: Login },
    Main: { screen: TabBar }
  },
  {
    navigationOptions: (params: any) => ({
      gesturesEnabled: true,
      gesturesDirection: 'inverted',
      headerStyle: {
        backgroundColor: '#0165A9'
      },
      headerTintColor: 'white'
    }),
    transitionConfig: () => ({
      screenInterpolator: (sceneProps) => {
        const { layout, position, scene } = sceneProps
        const { index } = scene
        const width = layout.initWidth

        return {
          opacity: position.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [0, 1, 0]
          }),
          transform: [
            {
              translateX: position.interpolate({
                inputRange: [index - 1, index, index + 1],
                outputRange: [-width, 0, width]
              })
            }
          ]
        }
      },
      headerTitleInterpolator: (sceneProps: any) => {
        const { position, scene } = sceneProps
        const { index } = scene

        return {
          opacity: position.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [0, 1, 0]
          }),
          transform: [
            {
              translateX: position.interpolate({
                inputRange: [index - 1, index, index + 1],
                outputRange: [-50, 0, 50]
              })
            }
          ]
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

export { TabBar }
export default connect(mapStateToProps)(ReduxNavigation)
