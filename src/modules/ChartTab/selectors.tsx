import { createSelector } from 'reselect'

import { NAME } from './constants'

export const getAll = (state: any) => state[NAME]

export const getCounts = createSelector(
  getAll,
  (all) => ({
    all: all.length
  })
)
