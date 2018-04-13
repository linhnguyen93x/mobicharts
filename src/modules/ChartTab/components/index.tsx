import * as React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { FilterTab } from 'src/components'
import { TimePicker } from 'src/components/time-picker'
import { ConnectedReduxProps } from 'src/shared/redux/connected-redux'

import { ITodo, State } from '../model'
import { getAll } from '../selectors'

interface TodosProps extends ConnectedReduxProps<State> {
    todos: ITodo[]
}

enum Filter {
  DAY = 'NGÀY',
  WEEK = 'TUẦN',
  MONTH = 'THÁNG',
  YEAR = 'NĂM'
}

const ChartTab: React.SFC<TodosProps> = (props) => {
  const { todos, dispatch } = props

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{'Báo cáo ngày 22/04/2018'.toUpperCase()}</Text>
      <FilterTab
        data={[Filter.DAY, Filter.WEEK, Filter.MONTH, Filter.YEAR]}
        onItemSelected={(item) => console.log(item)} />
      <TimePicker onDateChange={(date) => console.log(date)} />

      {/* <Button title="Add" onPress={() => { dispatch(addTodo('Hello Bi')) }} />
      {todos.map((t) => <Text key={t.id}>{t.text}</Text>)} */}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EAE9E6'
  },
  header: {
    padding: 15,
    textAlign: 'center',
    backgroundColor: '#EAE9E6',
    fontSize: 20,
    fontWeight: 'bold'
  }
})

export default connect(
  createStructuredSelector({
    todos: getAll
  })
)(ChartTab)
