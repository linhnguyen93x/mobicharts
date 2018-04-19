export interface SummaryChartRequest {
  p_issue_date: string
  p_time_type: number
  p_report_type: string
}

export interface Chart {
  label: string
  value: string
}

export interface SummaryChartResponse {
  label: string
  tongCong: number | null
  bieuDoCot: Chart[] | null,
  bieuDoCoCau: Chart[] | null
}

// This is the model of our module state (e.g. return type of the reducer)
export type SummaryChartState = SummaryChartResponse[]
