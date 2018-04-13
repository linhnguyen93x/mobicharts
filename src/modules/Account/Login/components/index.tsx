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
} from 'react-native'
import { globalStyle } from 'src/style'

import SubmitForm from './submit-form'

interface LoginState {
  isReady: boolean
  containerHeight: number
}

const { width, height } = Dimensions.get('window')

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
      require('assets/images/logo.png')
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
          onError={console.warn}
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
            <Image
              style={{ width: width / 4 }}
              source={require('assets/images/logo.png')}
              resizeMode="contain"
            />
            <SubmitForm />
            <Text style={[globalStyle.styles.textAlignCenter, styles.title]}>
              {'Chào mừng bạn đến với ứng dụng\nxem báo cáo của '}
              <Text style={globalStyle.styles.fontWeightBold}>Mobifone</Text>
            </Text>
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
