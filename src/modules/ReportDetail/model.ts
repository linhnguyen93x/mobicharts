export interface ReportDetailResponse {
  donutLeft: Donut[]
  donutRight: Donut[]
  line: Line[]
  tableDetail: any
}

export interface ReportDetailRequest {
  dateReport: string
  tab: number
  provincecode: string
  districtcode: string
}

export interface Donut {
  total: number
  type: string
}

export interface Line {
  data: number[]
  time: string
}

export type ReportDetailState = ReportDetailResponse[]
