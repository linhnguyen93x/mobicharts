import { ActionsObservable, ofType } from 'redux-observable'
import { Observable } from 'rxjs/Observable'
import { of } from 'rxjs/observable/of'
import { catchError, exhaustMap, map } from 'rxjs/operators'
import { SUBMIT_LOADER } from 'src/+state/constants'
import { endLoading } from 'src/+state/loadingActions'

import { getReportDetailSuccessAction } from './actions'
import { TReportDetail } from './actionsTypes'
import { GET_DETAIL_REPORT } from './constants'
import { ReportDetailClient, ReportDetailRequest, ReportDetailResponse } from './model'

interface IReportDetail {
  getReportDetail: (body: ReportDetailRequest) => Observable<ReportDetailResponse>
  startLoader: <T>(obs: Observable<T>, hideSpinner?: boolean) => Observable<T>
}

export const reportDetail$: any = (
  action$: ActionsObservable<TReportDetail>,
  store: any,
  { getReportDetail, startLoader }: IReportDetail
) => action$.pipe(
  ofType(GET_DETAIL_REPORT),
  exhaustMap((a) => startLoader(
    getReportDetail(a.payload).pipe(
      map((res) => {
        const mapToClient: ReportDetailClient = {
          legend: res.donutLeft.map((i) => i.type),
          donutLeft: res.donutLeft.map((i) => i.total),
          donutRight: res.donutRight.map((i) => i.total),
          line: res.line,
          tableDetail: res.tableDetail
        }

        return mapToClient
      }),
      map((res) => getReportDetailSuccessAction(res))
    )
  ).pipe(
    catchError((e) => {
      return of(endLoading(SUBMIT_LOADER))
    })
  ))
)
