import { ActionsObservable, ofType } from 'redux-observable'
import { Observable } from 'rxjs/Observable'
import { of } from 'rxjs/observable/of'
import { catchError, exhaustMap, map } from 'rxjs/operators'
import { SUBMIT_LOADER } from 'src/+state/constants'
import { endLoading } from 'src/+state/loadingActions'
import { hashJoin } from 'src/shared'

import { getReportDetailSuccessAction } from './actions'
import { TReportDetail } from './actionsTypes'
import { GET_DETAIL_REPORT } from './constants'
import { DonutPartClient, ReportDetailClient, ReportDetailRequest, ReportDetailResponse } from './model'
import { getAll } from './reducer'

interface IReportDetail {
  getReportDetail: (
    body: ReportDetailRequest
  ) => Observable<ReportDetailResponse>
  startLoader: <T>(obs: Observable<T>, hideSpinner?: boolean) => Observable<T>
}

export const reportDetail$: any = (
  action$: ActionsObservable<TReportDetail>,
  store: any,
  { getReportDetail, startLoader }: IReportDetail
) =>
  action$.pipe(
    ofType(GET_DETAIL_REPORT),
    exhaustMap((a) => {
      const cacheData = getAll(store.getState())[
        hashJoin(
          a.payload.reporttype,
          a.payload.datereport,
          a.payload.tab,
          a.payload.viewtab
        )
      ]

      if (cacheData) {
        return of(getReportDetailSuccessAction(a.payload, cacheData))
      }

      return startLoader(
        getReportDetail(a.payload).pipe(
          map((res) => {
            const donutParts: DonutPartClient[] = []
            res.donutParts.forEach((item) => {
              const legend: string[] = []
              const pie = item.donut.map((i) => {
                legend.push(i.type)
                return i.total
              })

              donutParts.push({ title: item.title, legend, pie, percent: item.percentChart })
            })

            const mapToClient: ReportDetailClient = {
              donutParts,
              lineParts: res.lineParts,
              tableDetail: res.tableDetail,
              listCodeColumn: res.listCodeColumn ? res.listCodeColumn : [],
              labellistCodeColumn: res.labellistCodeColumn ? res.labellistCodeColumn : [],
            }

            return mapToClient
          }),
          map((res) => getReportDetailSuccessAction(a.payload, res))
        )
      ).pipe(
        catchError((e) => {
          return of(endLoading(SUBMIT_LOADER))
        })
      )
    })
  )
