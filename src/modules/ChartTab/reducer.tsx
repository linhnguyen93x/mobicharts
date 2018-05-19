import { Reducer } from 'redux'

import { TSummaryChartSuccess } from './actionTypes'
import { GET_SUMMARY_CHART_SUCCESS } from './constants'
import { SummaryChartState } from './model'

const initialState: SummaryChartState = {}

const reducer: Reducer<SummaryChartState> = (s: SummaryChartState = initialState, a: TSummaryChartSuccess) => {
  switch (a.type) {
    case GET_SUMMARY_CHART_SUCCESS:
      return {
        ...s,
        [`${a.action.date}_${a.action.type}`]: a.payload
      }
    default:
      return s
  }
}

export default reducer
