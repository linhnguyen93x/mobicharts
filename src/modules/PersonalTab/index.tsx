import * as React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 25,
    textAlign: 'center',
    margin: 10
  }
})

class PersonalTab extends React.Component<any, any> {
  static navigationOptions = {
    title: 'Notification'
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Notification</Text>
      </View>
    )
  }
}

export default PersonalTab
