import { ActionCreator } from 'redux'

import { TReportDetail, TReportDetailCache, TReportDetailSuccess } from './actionsTypes'
import { GET_DETAIL_REPORT, GET_DETAIL_REPORT_CACHE, GET_DETAIL_REPORT_SUCCESS } from './constants'
import { ActionParams, ReportDetailRequest } from './model'

export const getReportDetailAction: ActionCreator<TReportDetail> = (payload: ReportDetailRequest) => ({
  type: GET_DETAIL_REPORT,
  payload
})

export const getReportDetailSuccessAction: ActionCreator<TReportDetailSuccess> = (action: ActionParams, payload) => ({
  type: GET_DETAIL_REPORT_SUCCESS,
  action,
  payload
})

export const getReportDetailCacheAction: ActionCreator<TReportDetailCache> = (action: ActionParams) => ({
  type: GET_DETAIL_REPORT_CACHE,
  action
})
