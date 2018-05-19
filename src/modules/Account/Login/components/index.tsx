import { AppLoading, Asset } from 'expo'
import * as React from 'react'
import {
  Dimensions,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  LayoutChangeEvent,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native'

import SubmitForm from './submit-form'

interface LoginState {
  isReady: boolean
  containerHeight: number
}

const { height } = Dimensions.get('window')

class LoginScreen extends React.Component<any, LoginState> {
  static navigationOptions = {
    title: 'Login',
    header: null
  }

  state: LoginState = {
    isReady: false,
    containerHeight: height
  }

  async _cacheResourcesAsync() {
    const images = [
      require('assets/images/login.png'),
      require('assets/images/app_logo.png')
    ]

    const cacheImages = images.map((image) => {
      return Asset.fromModule(image).downloadAsync()
    })
    await Promise.all(cacheImages)
  }

  render() {
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this._cacheResourcesAsync}
          onFinish={() => this.setState({ isReady: true })}
          onError={() => {}}
        />
      )
    }

    return (
      <ScrollView
        onLayout={(event: LayoutChangeEvent) =>
          this.setState({ containerHeight: event.nativeEvent.layout.height })
        }
        showsVerticalScrollIndicator={false}
      >
        <KeyboardAvoidingView behavior="padding">
          <ImageBackground
            style={[styles.imageContainer, { height: this.state.containerHeight }]}
            source={require('assets/images/login.png')}
          >
            <View style={{ flex: .8, justifyContent: 'space-around', width: '100%', alignItems: 'center', }}>
              <Image
                style={{ width: 150, height: 150 }}
                source={require('assets/images/app_logo.png')}
                resizeMode="cover"
              />
              <SubmitForm />
            </View>
            <View style={{ flex: .2 }} />
            <View style={{ flexDirection: 'row', marginHorizontal: 16, marginBottom: 8, alignItems: 'flex-end', justifyContent: 'space-between', alignSelf: 'stretch' }}>
              <Text style={{ color: 'white', fontSize: 12 }}>Version 1.0</Text>
              <Text style={{ color: 'white', fontSize: 12 }}>© 2018 Bản quyền của Mobifone</Text>
            </View>
          </ImageBackground>
        </KeyboardAvoidingView>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  imageContainer: {
    justifyContent: 'space-around',
    width: '100%',
    alignItems: 'center',
    paddingTop: 16,
    paddingBottom: 8
  },
  title: {
    color: 'white',
    fontSize: 16
  }
})

export default LoginScreen
