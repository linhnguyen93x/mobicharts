import { Reducer } from 'redux'
import { createSelector } from 'reselect'
import { IApplicationState } from 'src/+state/reducers'
import { create2DArray, formatCurrency } from 'src/shared'

import { TReportDetailSuccess } from './actionsTypes'
import { GET_DETAIL_REPORT_SUCCESS, NAME } from './constants'
import { ReportDetailState, Table } from './model'

const initialState: ReportDetailState = {
  legend: [],
  donutLeft: [],
  donutRight: [],
  line: [],
  tableDetail: []
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
  const lineData = all.line
  const responseData = lineData.length > 0 ? create2DArray(lineData[0].data.length) : []

  responseData.forEach((item, index) => {
    lineData.forEach((i, indexChild) => {
      responseData[index][indexChild] = {y: i.data[index], x: indexChild}
    })
  })

  return {
    data: responseData,
    times: lineData.map((item) => Number(item.time))
  }
})

export const getTable = createSelector(
  getAll,
  (all) => {
    const tableDetail = all.tableDetail

    if (tableDetail.length <= 0) {
      return []
    }
    const response: any[][] = []

    tableDetail.forEach((item) => {
      const index = 0
      const hostDetailData = item.detailType.map((item) => item.value)
      response.push([item.shopName, formatCurrency(item.total), ...hostDetailData, index])
      mapToTable(response, item, index)
    })

    return response
  }
)

const mapToTable = (host: any[][], obj: Table, index: number) => {
  if (obj.child.length > 0) {
    index++
    obj.child.forEach((item) => {
      const hostDetailData = item.detailType.map((item) => formatCurrency(item.value))
      host.push([item.shopName, formatCurrency(item.total), ...hostDetailData, index])

      mapToTable(host, item, index)
    })
  }
}

export default reducer
