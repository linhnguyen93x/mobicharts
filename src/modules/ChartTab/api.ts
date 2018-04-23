import { Observable } from 'rxjs/Observable'
import { api } from 'src/api'

import { SummaryChartRequest, SummaryChartResponse } from './model'

const getSummaryChart = (body: SummaryChartRequest): Observable<SummaryChartResponse[]> => {
  return api.request('/mobile/export/pck_mobile_report.html', body)
}

export const SummaryChartApi = {
  getSummaryChart
}
