import { Entypo } from '@expo/vector-icons'
import * as React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

interface LegendProps {
  data: any[]
  color: string[]
  selectedIndex?: number | null
  onPress?: (index: number) => void
  iconType?: keyof typeof IconType
  style?: object
}

enum IconType {
  circle = 'controller-record',
  sum = 'plus'
}

class Legend extends React.PureComponent<LegendProps, {}> {
  public static defaultProps: Partial<LegendProps> = {
    iconType: 'circle'
}

  render() {
    const width = 100 / (this.props.data.length % 4)
    const { iconType, style } = this.props

    return <View style={styles.legendContainer}>
    {this.props.data.map((item, index) => (
      <TouchableOpacity
        key={index}
        style={{
          width: `${width}%`
        }}
        onPress={() => this.props.onPress ? this.props.onPress(index) : {}}
      >
        <View
          style={[{
            flexDirection: 'row',
            paddingLeft: '25%',
            opacity:
              this.props.selectedIndex == null
                ? 1
                : this.props.selectedIndex === index
                  ? 1
                  : 0.3
          }, style]}
        >
          {iconType ? <Entypo
            style={{
              alignSelf: 'flex-start'
            }}
            name={IconType[iconType]}
            size={16}
            color={this.props.color[index]}
          /> : null}
          <Text
             style={{
              fontSize: 12,
              marginBottom: 2,
              textAlign: 'center'
            }}
          >
            {' ' + item}
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
    marginBottom: 4
  }
})

export default Legend
