import _ from 'lodash'
import { Reducer } from 'redux'
import { createSelector } from 'reselect'
import { IApplicationState } from 'src/+state/reducers'
import { create2DArray } from 'src/shared'

import { TReportDetailSuccess } from './actionsTypes'
import { GET_DETAIL_REPORT_SUCCESS, NAME } from './constants'
import { Line, ReportDetailState } from './model'

const initialState: ReportDetailState = {
  legend: [],
  donutLeft: [],
  donutRight: [],
  line: [],
  tableDetail: null
}

const reducer: Reducer<ReportDetailState> = (
  state = initialState,
  action: TReportDetailSuccess
) => {
  switch (action.type) {
    case GET_DETAIL_REPORT_SUCCESS:
      return action.payload
    default:
      return state
  }
}

export const getAll = (state: IApplicationState) => state[NAME]
export const getLegend = createSelector(getAll, (all) => all.legend)
export const getDonuts = createSelector(getAll, (all) => ({
  left: all.donutLeft,
  right: all.donutRight
}))
export const getLine = createSelector(getAll, (all) => {
  const lineData = _.sortBy(all.line, (el: Line) => el.time)
  const test = lineData.length > 0 ? create2DArray(2) : []

  let indexTime = 0
  test.forEach((item, index) => {
    indexTime = 0
    all.line.forEach((i, indexChild) => {
      test[index][indexChild] = {y: i.data[index], x: indexTime}
      indexTime++
    })
  })

  // console.log(JSON.stringify(test, null, 2))

  return {
    data: test,
    times: all.line.map((item) => item.time)
  }
})

export default reducer
