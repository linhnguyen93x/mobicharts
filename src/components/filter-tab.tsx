import * as React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

export interface TabProviderProps {
  data: string[]
  onItemSelected: (selectedItem: number) => any
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
        this.props.onItemSelected(index + 1)
      })
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {this.props.data.map((item, index) => {
          const itemStyle =
            this.state.selectedNumber === index
              ? styles.itemSelected
              : styles.item
          const textSelected =
            this.state.selectedNumber === index
              ? styles.textSelected
              : styles.text

          return (
            <TouchableOpacity
              style={itemStyle}
              key={index}
              onPress={() => this.tabChange(index)}
            >
              <Text style={textSelected}>{item}</Text>
            </TouchableOpacity>
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
    backgroundColor: 'white',
    // height: 40,
    alignItems: 'center'
  },
  item: {
    flex: 1,
    paddingHorizontal: 8,
    paddingVertical: 12,
  },
  itemSelected: {
    flex: 1,
    paddingHorizontal: 8,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#0165A9'
  },
  text: {
    color: '#75746F',
    fontSize: 12,
    textAlign: 'center'
  },
  textSelected: {
    color: '#0165A9',
    fontSize: 12,
    textAlign: 'center'
  }
})
