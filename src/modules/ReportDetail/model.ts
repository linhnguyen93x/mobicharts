import { Dictionary } from 'lodash'

export interface PercentChart {
  total: number
  using: number
  percent: number
}
export interface ReportDetailResponse {
  donutLeft: Donut[]
  donutRight: Donut[]
  line: Line[]
  tableDetail: Table[]
  label: string
  listCodeColumn: string[]
  labellistCodeColumn: string[]
  percentChart: PercentChart
}

export interface ReportDetailClient {
  legend: string[]
  donutLeft: number[]
  donutRight: PercentChart
  line: Line[]
  tableDetail: Table[]
  label: string
  listCodeColumn: string[]
  labellistCodeColumn: string[]
}

export interface ReportDetailRequest {
  datereport: string
  tab: number
  reporttype: string
  viewtab: string
  provincecode?: string
  districtcode?: string
}

export interface Donut {
  total: number
  type: string
}

export interface Line {
  data: number[]
  time: string
}

export interface Table {
  child: Table[]
  total: number | null
  shopCode: string | null
  shopName: string | null
  detailType: DetailType[]
  detailColumn: DetailColumn[]
}

export interface DetailType {
  value: number
  type: string
}

export interface DetailColumn {
  value: number
  code: string
}

export interface ActionParams {
  datereport: string
  tab: number
  reporttype: string
  viewtab: string
}

export type ReportDetailState = Dictionary<ReportDetailClient>
