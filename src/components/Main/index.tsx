import * as React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
})

class MainScreen extends React.Component<any, any> {
  static navigationOptions = {
    title: 'Main Screen',
    gesturesEnabled: false,
    headerLeft: null
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Main</Text>
      </View>
    )
  }
}

export default MainScreen
