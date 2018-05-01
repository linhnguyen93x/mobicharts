import { Entypo } from '@expo/vector-icons'
import * as React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { colors } from 'src/shared'

interface LegendProps {
  data: any[]
  selectedIndex?: number | null
  onPress?: (index: number) => void
}

class Legend extends React.PureComponent<LegendProps, {}> {
  render() {
    return <View style={styles.legendContainer}>
    {this.props.data.map((item, index) => (
      <TouchableOpacity
        key={index}
        style={{
          width: '33%'
        }}
        onPress={() => this.props.onPress ? this.props.onPress(index) : {}}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            opacity:
              this.props.selectedIndex == null
                ? 1
                : this.props.selectedIndex === index
                  ? 1
                  : 0.3
          }}
        >
          <Entypo
            style={{
              alignSelf: 'flex-start'
            }}
            name="dot-single"
            size={40}
            color={colors[index]}
          />
          <Text
            style={{
              textAlign: 'center'
            }}
          >
            {item}
          </Text>
        </View>
      </TouchableOpacity>
    ))}
  </View>
  }
}

const styles = StyleSheet.create({
  rowContainer: {
    flex: 1,
    flexDirection: 'row'
  },
  chart: {
    flex: 0.5,
    height: 200
  },
  legendContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginRight: 8
  }
})

export default Legend
