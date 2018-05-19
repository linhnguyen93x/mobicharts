import { Dictionary } from 'lodash'

export interface PercentChart {
  total: number
  using: number
  percent: number
}

export interface DonutPart {
    title: string
    donut: Donut[]
    percentChart: PercentChart
}

export interface LinePart {
  title: string
  line: Line[]
}

export interface DonutPartClient {
  title: string
  legend: string[]
  pie: number[]
  percent: PercentChart
}
export interface ReportDetailResponse {
  donutParts: DonutPart[]
  lineParts: LinePart[]
  listCodeColumn: string[]
  labellistCodeColumn: string[]
  tableDetail: Table[]
  lineLabel: string[]
}

export interface ReportDetailClient {
  donutParts: DonutPartClient[]
  lineParts: LinePart[]
  tableDetail: Table[]
  listCodeColumn: string[]
  labellistCodeColumn: string[]
  lineLabel: string[]
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
  showPercent: boolean
  percent?: number
  value: number
  code: string
  replaceBy?: string | null
}

export interface ActionParams {
  datereport: string
  tab: number
  reporttype: string
  viewtab: string
}

export interface ReportDetailState {
  isFetching: boolean
  selectedTab: string | null
  dictionary: Dictionary<ReportDetailClient>
}
