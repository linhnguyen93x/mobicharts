export interface SummaryChartRequest {
  datereport: string
  tab: number
}

export interface Chart {
  label: string
  value: string
}

export interface SummaryChartResponse {
  label: string
  tongCong: number | null
  unit: string
  codeReport: string
  bieuDoCot: Chart[] | null
  bieuDoCoCau: Chart[] | null
}

// This is the model of our module state (e.g. return type of the reducer)
export type SummaryChartState = SummaryChartResponse[]
