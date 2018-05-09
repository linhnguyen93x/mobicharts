import { Reducer } from 'redux'
import { IApplicationState } from 'src/+state/reducers'
import { hashJoin } from 'src/shared'

import { TReportDetailSuccess } from './actionsTypes'
import { GET_DETAIL_REPORT_SUCCESS, NAME } from './constants'
import { ReportDetailState } from './model'

const initialState: ReportDetailState = {}

const reducer: Reducer<ReportDetailState> = (
  s = initialState,
  a: TReportDetailSuccess
) => {
  switch (a.type) {
    case GET_DETAIL_REPORT_SUCCESS:
      return {
        ...s,
        [hashJoin(
          a.action.reporttype,
          a.action.datereport,
          a.action.tab,
          a.action.viewtab
        )]: a.payload
      }
    default:
      return s
  }
}

export const getAll = (state: IApplicationState) => state[NAME]

export default reducer
