import { Observable } from 'rxjs/Observable'
import { api } from 'src/api'

import { MapResponse } from './model'

const getMapInfo = (shopCode: string): Observable<MapResponse[]>  => {
  return api.request('/mobile/export/map.html', { shopCode })
}

export const MapApi = {
  getMapInfo
}
