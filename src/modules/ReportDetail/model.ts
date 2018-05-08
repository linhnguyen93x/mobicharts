export interface ReportDetailResponse {
  donutLeft: Donut[]
  donutRight: Donut[]
  line: Line[]
  tableDetail: Table[]
}

export interface ReportDetailRequest {
  dateReport: string
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
}

export interface DetailType {
  value: number
  type: string
}

export interface ReportDetailClient {
  legend: string[]
  donutLeft: number[]
  donutRight: number[]
  line: Line[]
  tableDetail: Table[]
}

export type ReportDetailState = ReportDetailClient
