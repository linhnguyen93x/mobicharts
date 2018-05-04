import _ from 'lodash'
import { Reducer } from 'redux'
import { createSelector } from 'reselect'
import { IApplicationState } from 'src/+state/reducers'
import { create2DArray, formatCurrency } from 'src/shared'

import { TReportDetailSuccess } from './actionsTypes'
import { GET_DETAIL_REPORT_SUCCESS, NAME } from './constants'
import { Line, ReportDetailState, Table } from './model'

const initialState: ReportDetailState = {
  legend: [],
  donutLeft: [],
  donutRight: [],
  line: [],
  tableDetail: {
    total: null,
    child: [],
    detailType: [],
    shopCode: null,
    shopName: null
  }
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
  const responseData = lineData.length > 0 ? create2DArray(lineData[0].data.length) : []

  responseData.forEach((item, index) => {
    lineData.forEach((i, indexChild) => {
      responseData[index][indexChild] = {y: i.data[index], x: Number(i.time)}
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
    const response: any[][] = []
    const hostDetailData = all.tableDetail.detailType.map((item) => item.value)
    const index = 0

    response.push([tableDetail.shopName, formatCurrency(tableDetail.total), ...hostDetailData, index])
    mapToTable(response, tableDetail, index)

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
