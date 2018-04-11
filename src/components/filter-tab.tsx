import * as React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export interface TabProviderProps {
  data: string[]
  onItemSelected: (selectedItem: string) => any
}

interface TabProviderState {
  selectedNumber: number
}

export class FilterTab extends React.Component<
  TabProviderProps,
  TabProviderState
> {
  state = { selectedNumber: 0 }

  tabChange = (index: number) => {
    if (this.state.selectedNumber !== index) {
      this.setState({ selectedNumber: index }, () => {
        this.props.onItemSelected(this.props.data[index])
      })
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {this.props.data.map((item, index) => {
          const itemStyle = this.state.selectedNumber === index ? styles.itemSelected : styles.item

          return (
            <Text style={itemStyle} key={index} onPress={() => this.tabChange(index)}>
              {item}
            </Text>
          )
        })}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 2,
    backgroundColor: 'white'
  },
  item: {
    flex: 1,
    textAlign: 'center',
    padding: 8,
    color: '#75746F'
  },
  itemSelected: {
    flex: 1,
    textAlign: 'center',
    padding: 8,
    borderBottomWidth: 2,
    borderBottomColor: '#0165A9',
    color: '#0165A9'
  }
})
