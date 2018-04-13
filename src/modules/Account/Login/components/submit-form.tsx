import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import * as React from 'react'
import { Keyboard, LayoutAnimation, StyleSheet, Text, UIManager, View } from 'react-native'
import { Button, Input } from 'react-native-elements'
import { connect } from 'react-redux'
import { ConnectedReduxProps } from 'src/shared/redux/connected-redux'

// Enable LayoutAnimation on Android
// tslint:disable-next-line:no-unused-expression
UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true)

interface FormState {
  username: string
  password: string
  usernameValid: boolean
  passwordValid: boolean
}

interface FormProps extends ConnectedReduxProps<any> {}

class SubmitForm extends React.PureComponent<FormProps, FormState> {
  usernameInput: any
  passwordInput: any

  state: FormState = {
    username: '',
    password: '',
    usernameValid: true,
    passwordValid: true
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

    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 18, marginBottom: 4 }}>Đăng nhập</Text>
        <View style={{ alignSelf: 'stretch' }}>
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
        </View>
        <View style={{ alignSelf: 'stretch' }}>
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
        </View>
        <Text>Ghi nhớ</Text>
        <Button
          loading={false}
          title="ĐĂNG NHẬP"
          containerStyle={{ flex: -1, alignSelf: 'stretch' }}
          buttonStyle={styles.signUpButton}
          linearGradientProps={{
            colors: ['#1F92EA', '#0064B0'],
            start: [1, 0],
            end: [0.2, 0]
          }}
          // titleStyle={styles.signUpButtonText}
          // onPress={this.signup}
          disabled={false}
        />
        <Text>Quên mật khẩu</Text>
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
    flex: -1,
    alignItems: 'center',
    padding: 16,
    width: '80%',
    borderRadius: 8,
    backgroundColor: 'white'
  },
  inputContainer: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#EDEDED',
    height: 45,
    marginVertical: 10
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
    width: '100%',
    borderRadius: 50,
    height: 45,
  }
})

export default connect()(SubmitForm)
