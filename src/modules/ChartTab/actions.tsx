import { ActionCreator } from 'redux'

import { TSummaryChart, TSummaryChartSuccess } from './actionTypes'
import { GET_SUMMARY_CHART_REQUEST, GET_SUMMARY_CHART_SUCCESS } from './constants'

export const getSummaryChartAction: ActionCreator<TSummaryChart> = ({p_issue_date, p_time_type, p_report_type}) => ({
  type: GET_SUMMARY_CHART_REQUEST,
  payload: {
    p_issue_date,
    p_time_type,
    p_report_type
  }
})

export const getSummaryChartSuccessAction: ActionCreator<TSummaryChartSuccess> = (payload) => ({
  type: GET_SUMMARY_CHART_SUCCESS,
  payload
})
