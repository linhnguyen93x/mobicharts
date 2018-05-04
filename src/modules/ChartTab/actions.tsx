import { ActionCreator } from 'redux'

import { TSummaryChart, TSummaryChartSuccess } from './actionTypes'
import { GET_SUMMARY_CHART_REQUEST, GET_SUMMARY_CHART_SUCCESS } from './constants'

export const getSummaryChartAction: ActionCreator<TSummaryChart> = ({datereport, tab}) => ({
  type: GET_SUMMARY_CHART_REQUEST,
  payload: {
    datereport,
    tab
  }
})

export const getSummaryChartSuccessAction: ActionCreator<TSummaryChartSuccess> = (payload) => ({
  type: GET_SUMMARY_CHART_SUCCESS,
  payload
})
