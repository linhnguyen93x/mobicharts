import { Action } from 'redux'

export interface AddTodoAction extends Action {
  type: '@@todos/ADD'
  payload: {
    text: string
  }
}

export type TodoActions = AddTodoAction
