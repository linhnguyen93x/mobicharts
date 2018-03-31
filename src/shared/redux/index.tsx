import { createReactNavigationReduxMiddleware, createReduxBoundAddListener } from 'react-navigation-redux-helpers'

const middleware = createReactNavigationReduxMiddleware(
  'root',
  (state: any) => state.nav
)
const addListener = createReduxBoundAddListener('root')

export { middleware, addListener }
