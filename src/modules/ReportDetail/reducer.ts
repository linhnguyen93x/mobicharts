import { Reducer } from 'redux'
import { createSelector } from 'reselect'
import { IApplicationState } from 'src/+state/reducers'
import { hashJoin } from 'src/shared'

import { SummaryChartParams } from '../ChartTab/components'
import { TReportDetailSuccess } from './actionsTypes'
import { GET_DETAIL_REPORT, GET_DETAIL_REPORT_CACHE, GET_DETAIL_REPORT_SUCCESS, NAME } from './constants'
import { ReportDetailState } from './model'

const initialState: ReportDetailState = {
  isFetching: false,
  dictionary: {},
  selectedTab: null
}

const reducer: Reducer<ReportDetailState> = (
  s = initialState,
  a: TReportDetailSuccess
) => {
  switch (a.type) {
    case GET_DETAIL_REPORT:
      return {
        ...s,
        selectedTab: null,
        isFetching: true
      }

    case GET_DETAIL_REPORT_SUCCESS:
      return {
        isFetching: false,
        selectedTab: a.action.viewtab,
        dictionary: {
          ...s.dictionary,
          [hashJoin(
            a.action.reporttype,
            a.action.datereport,
            a.action.tab,
            a.action.viewtab
          )]: a.payload
        }
      }
    case GET_DETAIL_REPORT_CACHE:
      return {
        ...s,
        selectedTab: a.action.viewtab,
        isFetching: false
      }
    default:
      return s
  }
}

export const getAll = (state: IApplicationState) => state[NAME].dictionary
export const checkExist = (state: IApplicationState, key: string) => {
  return state[NAME].dictionary.hasOwnProperty(key)
}
export const selectedTab = (state: IApplicationState, props: any) =>  {
  const {
    params
  }: { params: SummaryChartParams } = props.navigation.state

  return state[NAME].selectedTab ? hashJoin(
    params.codeReport,
    params.selectedTime,
    params.timeType,
    state[NAME].selectedTab
  ) : ''
}

export const getSelectedTab = (state: IApplicationState) => state[NAME].selectedTab

export const getDonuts  = createSelector(
  getAll,
  selectedTab,
  (all, hashParams) => {
    return all[hashParams] ? all[hashParams].donutParts : []
  }
)

export const getLines  = createSelector(
  getAll,
  selectedTab,
  (all, hashParams) => {
    return all[hashParams] ? all[hashParams].lineParts : []
  }
)

export const getTables = createSelector(
  getAll,
  selectedTab,
  (all, hashParams) => {
    if (all[hashParams]) {
      return {
        tables: all[hashParams].tableDetail,
        tableCodes: all[hashParams].labellistCodeColumn
      }
    }

    return null
  }
)

export default reducer
