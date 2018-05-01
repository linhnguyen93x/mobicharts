import { Action } from 'redux'

import { ReportDetailClient, ReportDetailRequest } from './model'

export interface TReportDetail extends Action {
  payload: ReportDetailRequest
}

export interface TReportDetailSuccess extends Action {
  payload: ReportDetailClient
}
