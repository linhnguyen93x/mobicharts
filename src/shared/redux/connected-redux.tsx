import { Dispatch } from 'react-redux'

// Additional props for connected React components. This prop is passed by default with `connect()`
export interface ConnectedReduxProps<S> {
    // Correct types for the `dispatch` prop passed by `react-redux`.
    // Additional type info,rmation is given through generics.
    dispatch: Dispatch<S>,
    navigation?: any
  }
