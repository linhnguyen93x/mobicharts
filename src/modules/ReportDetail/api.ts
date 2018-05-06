import { Observable } from 'rxjs/Observable'
import { api } from 'src/api'

import { ReportDetailRequest, ReportDetailResponse } from './model'

const getReportDetail = (body: ReportDetailRequest): Observable<ReportDetailResponse> => {
  return api.request('/mobile/export/report.html', body)
}

export const ReportDetailApi = {
  getReportDetail
}
