import { ActionCreator } from 'redux'

import { AddTodoAction } from './actionTypes'

export const addTodo: ActionCreator<AddTodoAction> = (text: string) => ({
  type: '@@todos/ADD',
  payload: {
    text
  }
})
