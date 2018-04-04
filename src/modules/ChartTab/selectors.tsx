import _ from 'lodash'
import { createSelector } from 'reselect'

import { NAME } from './constants'
import { filterActive, filterCompleted } from './model'

export const getAll = (state: any) => state[NAME]

export const getCompleted = _.flowRight(filterCompleted, getAll)

export const getActive = _.flowRight(filterActive, getAll)

export const getCounts = createSelector(
  getAll,
  getCompleted,
  getActive,
  (allTodos, completedTodos, activeTodos) => ({
    all: allTodos.length,
    completed: completedTodos.length,
    active: activeTodos.length
  })
)
