import { Action } from 'redux'

import { ActionParams, ReportDetailClient, ReportDetailRequest } from './model'

export interface TReportDetail extends Action {
  payload: ReportDetailRequest
}

export interface TReportDetailSuccess extends Action {
  action: ActionParams
  payload: ReportDetailClient
}
