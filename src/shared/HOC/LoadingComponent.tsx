import * as React from 'React'
import { View } from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay'
import { connect } from 'react-redux'
import { endLoading, startLoading } from 'src/+state/loadingActions'
import { ConnectedReduxProps } from 'src/shared/redux/connected-redux'
import uuid from 'uuid'

interface Props extends ConnectedReduxProps<{}> {
  loading: any
}

export const LoadingComponent = (
  ComposedComponent: React.ComponentType,
  loadingIdArrays: any
) => {
  class LoadingComponentClass extends React.Component<Props, any> {
    static displayName = `withState(${ComposedComponent.name})`
    loadingId: any
    loadingIdArray: any

    componentWillMount() {
      this.loadingId = uuid.v4
      this.loadingIdArray = loadingIdArrays
        ? [this.loadingId, ...loadingIdArrays]
        : [this.loadingId]
    }

    handleStartLoading = (loadingText: string) => {
      this.props.dispatch(startLoading(this.loadingId, loadingText))
    }

    handleEndLoading(loadId: any) {
      this.props.dispatch(endLoading(loadId ? loadId : this.loadingId))
    }

    render() {
      const { loading } = this.props
      const { loadingIdArray } = this

      let loadingObject: any
      loadingIdArray.forEach((id: any) => {
        const loadObj = loading[id]
        if (loadObj && loadObj.isLoading) {
          loadingObject = loadObj
        }
      })

      let isLoading = false
      if (loadingObject && loadingObject.isLoading && !loadingObject.hideSpinner) {
        isLoading = true
      }

      return (
        <View style={{ flex: 1 }}>
          <Spinner
            visible={isLoading}
            textContent={loadingObject ? loadingObject.text : 'Loading...'}
            textStyle={{ color: '#FFF' }}
          />
          <ComposedComponent {...this.props} />
        </View>
      )
    }
  }

  const mapStateToProps = (state: any) => {
    return { loading: state.loading }
  }

  return connect(mapStateToProps)(LoadingComponentClass)
}
