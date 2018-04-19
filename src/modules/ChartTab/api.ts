import { Observable } from 'rxjs/Observable'
import { map } from 'rxjs/operators'
import { api } from 'src/api'

import { SummaryChartRequest, SummaryChartResponse } from './model'

const getSummaryChart = (body: SummaryChartRequest): Observable<SummaryChartResponse[]> => {
  return api.request('/mobile/export/pck_mobile_report.html', body).pipe(
    map((res) => res[1])
  )
}

export const SummaryChartApi = {
  getSummaryChart
}
