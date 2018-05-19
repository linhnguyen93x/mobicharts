import { Action } from 'redux'

import { SummaryChartRequest, SummaryChartResponse } from './model'

export interface TSummaryChart extends Action {
  payload: SummaryChartRequest
}

export interface TSummaryChartSuccess extends Action {
  action: {
    date: string
    type: string | number
  }
  payload: SummaryChartResponse[]
}
