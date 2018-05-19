export interface MapResponse {
  site: string
  site_data_amount: number
  site_level: number
  description: string
  latx: number
  cell_type: string
  site_traffic_amount: number
  longy: number
  site_vlr_quantity: number
}

export interface MapClient {
  coordinate: Coordinate
  title: string
  description: string
  cellType: string
}

export interface Coordinate {
  latitude: number
  longitude: number
}

export interface MapState {
  isLoading: boolean
  data: MapClient[]
}
