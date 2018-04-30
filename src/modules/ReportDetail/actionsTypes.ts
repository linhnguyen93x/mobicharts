import { Action } from 'redux'

import { ReportDetailRequest, ReportDetailResponse } from './model'

export interface TReportDetail extends Action {
  payload: ReportDetailRequest
}

export interface TReportDetailSuccess extends Action {
  payload: ReportDetailResponse[]
}
