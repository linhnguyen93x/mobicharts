import { Alert } from 'react-native'
import { ActionsObservable, ofType } from 'redux-observable'
import { Observable } from 'rxjs/Observable'
import { of } from 'rxjs/observable/of'
import { catchError, exhaustMap, map } from 'rxjs/operators'
import { SUBMIT_LOADER } from 'src/+state/constants'
import { endLoading } from 'src/+state/loadingActions'

import { getSummaryChartSuccessAction } from './actions'
import { TSummaryChart } from './actionTypes'
import { GET_SUMMARY_CHART_REQUEST } from './constants'
import { SummaryChartRequest, SummaryChartResponse } from './model'
import { getAll } from './selectors'

interface ISummaryChart {
  getSummaryChart: (
    body: SummaryChartRequest
  ) => Observable<SummaryChartResponse[]>
  startLoader: <T>(obs: Observable<T>, hideSpinner?: boolean) => Observable<T>
}

export const summaryChartEpic: any = (
  action$: ActionsObservable<TSummaryChart>,
  store: any,
  { getSummaryChart, startLoader }: ISummaryChart
) => {
  return action$.pipe(
    ofType(GET_SUMMARY_CHART_REQUEST),
    exhaustMap((a) => {
      const cacheData = getAll(store.getState())[
        `${a.payload.datereport}_${a.payload.tab}`
      ]

      return startLoader(
        (cacheData ? of(cacheData) : getSummaryChart(a.payload)).pipe(
          map((res) => getSummaryChartSuccessAction(a.payload, res))
        )
      ).pipe(
        catchError((e) => {
          Alert.alert(
            'Thông báo',
            'Không thể kết nối đến máy chủ.',
            [
              {text: 'OK', onPress: () => console.info('OK Pressed')}
            ],
            { cancelable: false }
          )

          return of(endLoading(SUBMIT_LOADER))
        })
      )
    })
  )
}
