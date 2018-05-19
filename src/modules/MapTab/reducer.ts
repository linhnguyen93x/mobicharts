import { Reducer } from 'redux'
import { createSelector } from 'reselect'
import { IApplicationState } from 'src/+state/reducers'

import { TMapInfoSuccess } from './actionTypes'
import { GET_MAP_INFO, GET_MAP_INFO_SUCCESS, NAME } from './constants'
import { MapState } from './model'

const initialState: MapState = {
  isLoading: false,
  data: []
}

const reducer: Reducer<MapState> = (s = initialState, a: TMapInfoSuccess) => {
  switch (a.type) {
    case GET_MAP_INFO:
      return {
        isLoading: true,
        data: []
      }
    case GET_MAP_INFO_SUCCESS:
      return {
        isLoading: false,
        data: a.payload
      }

    default:
      return s
  }
}

const getAll = (state: IApplicationState) => state[NAME]

export const getLoading = createSelector(
  getAll,
  (all) => all.isLoading
)

export const getMarkers = createSelector(
  getAll,
  (all) => all.data
)

export default reducer
