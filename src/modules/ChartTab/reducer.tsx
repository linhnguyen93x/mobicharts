import { Reducer } from 'redux'

import { TSummaryChartSuccess } from './actionTypes'
import { GET_SUMMARY_CHART_REQUEST, GET_SUMMARY_CHART_SUCCESS } from './constants'
import { SummaryChartState } from './model'

const initialState: SummaryChartState = []

const reducer: Reducer<SummaryChartState> = (state: SummaryChartState = initialState, action: TSummaryChartSuccess) => {
  switch (action.type) {
    case GET_SUMMARY_CHART_REQUEST:
      return initialState
    case GET_SUMMARY_CHART_SUCCESS:
      return action.payload
    default:
      return state
  }
}

export default reducer
