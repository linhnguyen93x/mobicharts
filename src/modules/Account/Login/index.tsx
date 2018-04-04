import * as React from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import { connect } from 'react-redux'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
})

class LoginScreen extends React.Component<any, any> {
  static navigationOptions = {
    title: 'Login'
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Login</Text>
        <Button title="Log in" onPress={() => this.props.dispatch({type: 'Login'})}></Button>
      </View>
    )
  }
}

export default connect()(LoginScreen)
