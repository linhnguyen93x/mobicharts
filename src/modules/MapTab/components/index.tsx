import { Constants, Location, MapView, Permissions } from 'expo'
import * as React from 'react'
import { Platform, StyleSheet, Text, View } from 'react-native'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { appEpic$ } from 'src/+state/epics'
import { ConnectedReduxProps } from 'src/shared/redux/connected-redux'

import { getMapInfoAction } from '../actions'
import { mapInfo$ } from '../epic'
import { MapClient, MapState } from '../model'
import { getLoading, getMarkers } from '../reducer'

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  }
})

interface Props extends ConnectedReduxProps<MapState> {
  isLoading: boolean
  markers: MapClient[]
}

interface State {
  location: {
    latitude: number
    longitude: number
    latitudeDelta?: number
    longitudeDelta?: number
  } | null
  errorMessage: string | null
}

class MapTab extends React.Component<Props, State> {
  static navigationOptions = {
    title: 'Bản đồ số',
    gesturesEnabled: false,
    headerLeft: null
  }

  state: State = {
    location: null,
    errorMessage: null
  }

  componentDidMount() {
    const currentEpic = appEpic$.value

    if (currentEpic !== mapInfo$) {
      appEpic$.next(mapInfo$)
    }
    this.props.dispatch(getMapInfoAction('2MFHCM2'))

    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage:
          'Oops, this will not work on Sketch in an Android emulator. Try it on your device!'
      })
    } else {
      this._getLocationAsync()
    }
  }

  _getLocationAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION)
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied'
      })
    }

    const location = await Location.getCurrentPositionAsync({})
    const { latitude, longitude } = location.coords
    this.setState({
      location: {
        latitude,
        longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      }
    })
  }

  render() {
    if (!this.state.location) {
      return <View />
    }

    const { isLoading, markers } = this.props
    console.log(markers.length)

    return (
      <View style={styles.container}>
        <MapView
        style={styles.map}
        showsUserLocation={true}
        initialRegion={this.state.location}
        >
          {/* {markers.map((marker, index) => (
            <MapView.Marker
              key={index}
              coordinate={marker.coordinate}
              title={marker.title}
              description={marker.description}
            />
          ))} */}
        </MapView>
        { isLoading ? <Text>Loading...</Text> : null }
      </View>
    )
  }
}

export default connect(
  createStructuredSelector({
    isLoading: getLoading,
    markers: getMarkers
  })
)(MapTab)
