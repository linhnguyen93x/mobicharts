import { NavigationActions } from 'react-navigation'
import { Action, combineReducers } from 'redux'
import { AppNavigator } from '../navigators/AppNavigator'


// Start with two routes: The Main screen, with the Login screen on top.
// const firstAction = AppNavigator.router.getActionForPathAndParams('Home');
// const tempNavState = AppNavigator.router.getStateForAction(firstAction);
// const secondAction = AppNavigator.router.getActionForPathAndParams('Login');
// const initialNavState = AppNavigator.router.getStateForAction(secondAction, tempNavState);

const initialState = AppNavigator.router.getStateForAction(AppNavigator.router.getActionForPathAndParams('Home'));

function nav(state = initialState, action: Action) {
  let nextState;
  switch (action.type) {
    // case 'Login':
    //   nextState = AppNavigator.router.getStateForAction(NavigationActions.back(), state);
    //   break;
    // case 'Logout':
    //   nextState = AppNavigator.router.getStateForAction(NavigationActions.navigate({ routeName: 'Login' }), state);
    //   break;
    default:
      nextState = AppNavigator.router.getStateForAction(action, state);
      break;
  }


  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state;
  // return state
}

const initialAuthState = { isLoggedIn: false };

function auth(state = initialAuthState, action: Action) {
  console.log(action)
  switch (action.type) {
    case 'Login':
      return { ...state, isLoggedIn: true };
    case 'Logout':
      return { ...state, isLoggedIn: false };
    default:
      return state;
  }
}

const AppReducer = combineReducers({
  nav,
  auth
});

export default AppReducer;