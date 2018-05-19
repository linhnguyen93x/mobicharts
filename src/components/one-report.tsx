import * as React from 'react'
import { Text, View } from 'react-native'

export const OneReport = (props: any) => {
  return (<View style={{ flex: 1 }}>
    <Text
      style={{
        color: 'white',
        textAlign: 'center',
        marginLeft: 16,
        fontSize: 20,
        fontWeight: 'bold'
      }}
    >
      ONE<Text style={{ color: 'red', fontSize: 20 }}>REPORT</Text>
    </Text>
  </View>)
}
