export interface ITodo {
  id?: number
  text: string
  completed: boolean
}

// This is the model of our module state (e.g. return type of the reducer)
export type State = ITodo[]

// Some utility functions that operates on our model
export const filterCompleted = (todos: ITodo[]) => todos.filter((t) => t.completed)

export const filterActive = (todos: ITodo[]) => todos.filter((t) => !t.completed)
