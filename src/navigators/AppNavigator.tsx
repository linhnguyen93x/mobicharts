import * as React from 'react'
import { addNavigationHelpers, StackNavigator } from 'react-navigation'
import { connect } from 'react-redux'
import HomeScreen from '../components/Home'
import { addListener } from '../shared/redux'

export const AppNavigator = StackNavigator({
  Home: { screen: HomeScreen }
});


const AppWithNavigationState = ({ dispatch, nav }: any) => {
  console.log("nav", nav);
  return (
    <AppNavigator
      navigation={addNavigationHelpers({
        dispatch,
        state: nav,
        addListener
      })}
    />
  );
};

const mapStateToProps = (state: any) => ({
  nav: state.nav
});

export default connect(mapStateToProps)(AppWithNavigationState);
