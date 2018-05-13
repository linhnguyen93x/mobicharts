import _ from 'lodash'
import { ActionsObservable, ofType } from 'redux-observable'
import { Observable } from 'rxjs/Observable'
import { exhaustMap, map } from 'rxjs/operators'

import { getMapInfoSuccessAction } from './actions'
import { TMapInfo } from './actionTypes'
import { GET_MAP_INFO } from './constants'
import { MapClient, MapResponse } from './model'

interface IMapInfo {
  getMapInfo: (shopCode: string) => Observable<MapResponse[]>
}

export const mapInfo$: any = (
  action$: ActionsObservable<TMapInfo>,
  store: any,
  { getMapInfo }: IMapInfo
) => action$.pipe(
  ofType(GET_MAP_INFO),
  exhaustMap((a): any => getMapInfo(a.payload.shopCode).pipe(
      map((res) => {
        const mapToClient: MapClient[] = _.map(res, (item) => {
          const descriptionNew = item.description.replace(/\&nbsp/g, '').replace(/<(?:.|\n)*?>/gm, '')
          console.log(descriptionNew)

          return ({
          coordinate: {
            latitude: item.latx,
            longitude: item.longy
          },
          title: item.site,
          description: descriptionNew,
          cellType: item.cell_type
        })})

        return getMapInfoSuccessAction(mapToClient)
      })
    )
  )
)
