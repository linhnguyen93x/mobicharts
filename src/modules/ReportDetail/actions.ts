import { ActionCreator } from 'redux'

import { TReportDetail, TReportDetailSuccess } from './actionsTypes'
import { GET_DETAIL_REPORT, GET_DETAIL_REPORT_SUCCESS } from './constants'
import { ReportDetailRequest } from './model'

export const getReportDetailAction: ActionCreator<TReportDetail> = (payload: ReportDetailRequest) => ({
  type: GET_DETAIL_REPORT,
  payload
})

export const getReportDetailSuccessAction: ActionCreator<TReportDetailSuccess> = (payload) => ({
  type: GET_DETAIL_REPORT_SUCCESS,
  payload
})
