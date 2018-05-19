import { ActionCreator } from 'redux'

import { TMapInfo, TMapInfoSuccess } from './actionTypes'
import { GET_MAP_INFO, GET_MAP_INFO_SUCCESS } from './constants'

export const getMapInfoAction: ActionCreator<TMapInfo> = (shopCode: string) => ({
  type: GET_MAP_INFO,
  payload: {
    shopCode
  }
})

export const getMapInfoSuccessAction: ActionCreator<TMapInfoSuccess> = (payload) => ({
  type: GET_MAP_INFO_SUCCESS,
  payload
})
