import { Reducer } from 'redux'

import { TodoActions } from './actionTypes'
import { State } from './model'

const initialState: State = [
  {
    text: 'Use Redux',
    completed: false,
    id: 0
  }
]

const reducer: Reducer<State> = (state: State = initialState, action: TodoActions) => {
  switch (action.type) {
    case '@@todos/ADD':
      return [
        ...state,
        {
          text: action.payload.text,
          completed: false,
          id: 1
        }
      ]
    default:
      return state
  }
}

export default reducer
