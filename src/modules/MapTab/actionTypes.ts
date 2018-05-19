import { Action } from 'redux'

import { MapClient } from './model'

export interface TMapInfo extends Action {
  payload: {
    shopCode: string
  }
}

export interface TMapInfoSuccess extends Action {
  payload: MapClient[]
}
