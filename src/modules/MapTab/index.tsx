import { Constants, Location, MapView, Permissions } from 'expo'
import * as React from 'react'
import { Platform, StyleSheet, View } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  }
})

interface State {
  location: {
    latitude: number
    longitude: number
    latitudeDelta?: number
    longitudeDelta?: number
  } | null
  errorMessage: string | null
}

class MapTab extends React.Component<{}, State> {
  static navigationOptions = {
    title: 'Bản đồ số',
    gesturesEnabled: false,
    headerLeft: null
  }

  state: State = {
    location: null,
    errorMessage: null
  }

  componentWillMount() {
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

    return (
      <MapView
        style={{ flex: 1 }}
        showsUserLocation={true}
        initialRegion={this.state.location}
      />
    )
  }
}

export default MapTab
