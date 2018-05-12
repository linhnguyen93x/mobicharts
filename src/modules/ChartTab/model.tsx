import { Dictionary } from 'lodash'

export interface SummaryChartRequest {
  datereport: string
  tab: number
}

export interface Chart {
  label: string
  value: number
}

export interface SummaryChartResponse {
  label: string
  tongCong: number | null
  unit: string
  valueUnit: string | null
  codeReport: string
  bieuDoCot: Chart[] | null
  bieuDoCoCau: Chart[] | null
}

// This is the model of our module state (e.g. return type of the reducer)
export type SummaryChartState = Dictionary<SummaryChartResponse[]>
