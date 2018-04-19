import { ActionsObservable, ofType } from 'redux-observable'
import { Observable } from 'rxjs/Observable'
import { of } from 'rxjs/observable/of'
import { catchError, exhaustMap, map } from 'rxjs/operators'
import { SUBMIT_LOADER } from 'src/+state/constants'
import { endLoading } from 'src/+state/loadingActions'

import { startLoader } from '../../shared/startLoader'
import { getSummaryChartSuccessAction } from './actions'
import { TSummaryChart } from './actionTypes'
import { GET_SUMMARY_CHART_REQUEST } from './constants'
import { SummaryChartRequest, SummaryChartResponse } from './model'

interface ISummaryChart {
  getSummaryChart: (body: SummaryChartRequest) => Observable<SummaryChartResponse[]>
  startLoader: <T>(obs: Observable<T>, hideSpinner: boolean) => Observable<T>
}

export const summaryChartEpic: any = (
  action$: ActionsObservable<TSummaryChart>,
  store: any,
  { getSummaryChart }: ISummaryChart
) => {
  return action$.pipe(
    ofType(GET_SUMMARY_CHART_REQUEST),
    exhaustMap((a) =>
      startLoader(
        getSummaryChart(a.payload).pipe(
          map((res) => getSummaryChartSuccessAction(res))
        )
      ).pipe(
        catchError((e) => {
          return of(endLoading(SUBMIT_LOADER))
        })
      )
    )
  )
}
