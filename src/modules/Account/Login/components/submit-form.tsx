import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import * as React from 'react'
import { Keyboard, LayoutAnimation, StyleSheet, Text, UIManager, View } from 'react-native'
import { Button, Input } from 'react-native-elements'
import { connect } from 'react-redux'
import { SUBMIT_LOADER } from 'src/+state/constants'
import { ConnectedReduxProps } from 'src/shared/redux/connected-redux'
import { globalStyle } from 'src/style'

import { loginAction } from '../actions'

// Enable LayoutAnimation on Android
// tslint:disable-next-line:no-unused-expression
UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true)

interface FormState {
  username: string
  password: string
  usernameValid: boolean
  passwordValid: boolean
  remembered: boolean
}

interface FormProps extends ConnectedReduxProps<any> {
  loading: any
}

class SubmitForm extends React.PureComponent<FormProps, FormState> {
  usernameInput: any
  passwordInput: any

  state: FormState = {
    username: 'admin',
    password: 'BV@F61528DNH',
    usernameValid: true,
    passwordValid: true,
    remembered: false
  }

  componentDidMount() {}

  signup = () => {
    LayoutAnimation.easeInEaseOut()
    const usernameValid = this.validateUsername()
    const passwordValid = this.validatePassword()
    if (passwordValid && usernameValid) {
      const { username, password } = this.state

      this.props.dispatch(loginAction({ userName: username, password }))
      // this.props.dispatch(startLoading(SUBMIT_LOADER, 'Đang tải', true))
      // setTimeout(() => {
      //   LayoutAnimation.easeInEaseOut()
      //   this.props.dispatch(endLoading(SUBMIT_LOADER))
      //   Alert.alert('🎸', 'You rock')
      // }, 1500)
    }
  }

  validateUsername = () => {
    const { username } = this.state
    const usernameValid = username.length > 0
    LayoutAnimation.easeInEaseOut()
    this.setState({ usernameValid })

    if (!usernameValid) {
      this.usernameInput.shake()
    }

    return usernameValid
  }

  validatePassword = () => {
    const { password } = this.state
    const passwordValid = password.length > 0
    LayoutAnimation.easeInEaseOut()
    this.setState({ passwordValid })

    if (!passwordValid) {
      this.passwordInput.shake()
    }

    return passwordValid
  }

  render() {
    const { username, password, usernameValid, passwordValid } = this.state
    const { loading } = this.props
    const isLoading = loading[SUBMIT_LOADER] && loading[SUBMIT_LOADER].isLoading

    return (
      <View style={styles.container}>
        <Text
          style={[
            globalStyle.styles.fontWeightBold,
            { fontSize: 18, marginBottom: 4, color: '#0E839D' }
          ]}
        >
          Đăng nhập
        </Text>
        <FormInput
          refInput={(input: any) => (this.usernameInput = input)}
          icon={<MaterialIcons name="person" size={18} color="#777A7D" />}
          value={username}
          onChangeText={(username: string) => this.setState({ username })}
          placeholder="Tên đăng nhập"
          returnKeyType="next"
          errorMessage={usernameValid ? null : 'Your username can\'t be blank'}
          onSubmitEditing={() => {
            this.validateUsername()
            this.passwordInput.focus()
          }}
        />
        <FormInput
          refInput={(input: any) => (this.passwordInput = input)}
          icon={<Ionicons name="md-key" size={18} color="#777A7D" />}
          value={password}
          onChangeText={(password: string) => this.setState({ password })}
          placeholder="Mật khẩu"
          returnKeyType="done"
          secureTextEntry
          errorMessage={passwordValid ? null : 'Your password can\'t be blank'}
          onSubmitEditing={() => {
            this.validatePassword()
            // this.emailInput.focus()
            Keyboard.dismiss()
          }}
        />
        <Button
          loading={isLoading}
          title="ĐĂNG NHẬP"
          containerStyle={{ flex: -1, alignSelf: 'stretch', marginVertical: 32 }}
          buttonStyle={styles.signUpButton}
          linearGradientProps={{
            colors: ['#0BC4DE', '#1F92EA'],
            start: [1, 0],
            end: [0.2, 0]
          }}
          // titleStyle={styles.signUpButtonText}
          onPress={this.signup}
          disabled={isLoading}
        />
      </View>
    )
  }
}

export const FormInput = (props: any) => {
  const { icon, refInput, ...otherProps } = props
  return (
    <Input
      {...otherProps}
      ref={refInput}
      containerStyle={{ width: '100%' }}
      inputContainerStyle={styles.inputContainer}
      rightIcon={icon}
      rightIconContainerStyle={{ marginRight: 10 }}
      inputStyle={styles.input}
      autoFocus={false}
      autoCapitalize="none"
      keyboardAppearance="dark"
      errorStyle={styles.errorInputStyle}
      autoCorrect={false}
      blurOnSubmit={false}
      placeholderTextColor="#999999"
    />
  )
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    flex: 0.9,
    alignItems: 'center',
    padding: 16,
    width: '80%',
  },
  inputContainer: {
    borderRadius: 23,
    height: 45,
    marginVertical: 10,
    backgroundColor: 'white'
  },
  input: {
    flex: 1,
    color: 'black',
    fontSize: 16,
    marginRight: 10
  },
  errorInputStyle: {
    marginTop: 0,
    textAlign: 'center',
    color: '#F44336'
  },
  signUpButton: {
    width: '50%',
    borderRadius: 50,
    height: 45,
    alignSelf: 'center',
  }
})

const mapStateToProps = (state: any) => {
  return { loading: state.loading }
}

export default connect(mapStateToProps)(SubmitForm)
