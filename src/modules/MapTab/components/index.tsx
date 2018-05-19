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
      location: this.regionFrom(latitude, longitude, 200)
    })
  }

  regionFrom(lat: number, lon: number, distance: number) {
    distance = distance / 2
    const circumference = 40075
    const oneDegreeOfLatitudeInMeters = 111.32 * 1000
    const angularDistance = distance / circumference

    const latitudeDelta = distance / oneDegreeOfLatitudeInMeters
    const longitudeDelta = Math.abs(Math.atan2(
            Math.sin(angularDistance) * Math.cos(lat),
            Math.cos(angularDistance) - Math.sin(lat) * Math.sin(lat)))

    return {
        latitude: lat,
        longitude: lon,
        latitudeDelta,
        longitudeDelta,
    }
  }

  renderMarkerImage = (type: string) => {
    switch (type) {
      case '1':
        return require('assets/images/type1.png')
      case '2':
        return require('assets/images/type2.png')
      case '3':
        return require('assets/images/type3.png')
      case '4':
        return require('assets/images/type4.png')
      default:
        return require('assets/images/type1.png')
    }

  }

  render() {
    if (!this.state.location) {
      return <View />
    }

    const { isLoading, markers } = this.props

    return (
      <View style={styles.container}>
        <MapView
        style={styles.map}
        showsUserLocation={true}
        initialRegion={this.state.location}
        onMapReady={() => this.props.dispatch(getMapInfoAction('2MFHCM2'))}
        >
          {markers.map((marker, index) => (
            <MapView.Marker
              key={index}
              coordinate={marker.coordinate}
              title={marker.title}
              description={marker.description}
              image={this.renderMarkerImage(marker.cellType)}
            />
          ))}
        </MapView>
        <View style={styles.infoContainer} pointerEvents="none">
          { isLoading ? <Text style={styles.loading}>Đang lấy thông tin trạm...</Text> : null }
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  infoContainer: {
    flex: 1,
    marginVertical: 20,
    backgroundColor: 'transparent',
  },
  loading: {
    alignSelf: 'flex-end',
  }
})

export default connect(
  createStructuredSelector({
    isLoading: getLoading,
    markers: getMarkers
  })
)(MapTab)
