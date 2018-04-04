import * as React from 'react'
import { Button, Text, View } from 'react-native'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { ConnectedReduxProps } from 'src/shared/redux/connected-redux'

import { addTodo } from '../actions'
import { ITodo, State } from '../model'
import { getAll } from '../selectors'

interface TodosProps extends ConnectedReduxProps<State> {
    todos: ITodo[]
}

const ChartTab: React.SFC<TodosProps> = (props) => {
  const { todos, dispatch } = props

  return (
    <View>
      <Button title="Add" onPress={() => { dispatch(addTodo('Hello Bi')) }} />
      {todos.map((t) => <Text key={t.id}>{t.text}</Text>)}
    </View>
  )
}

export default connect(
  createStructuredSelector({
    todos: getAll
  })
)(ChartTab)
