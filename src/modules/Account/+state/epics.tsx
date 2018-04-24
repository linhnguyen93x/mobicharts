import { Alert } from 'react-native'
import { ActionsObservable, ofType } from 'redux-observable'
import { Observable } from 'rxjs/Observable'
import { of } from 'rxjs/observable/of'
import { catchError, concat, concatMap, exhaustMap } from 'rxjs/operators'
import { api } from 'src/api'
import { ILocalStorage } from 'src/shared/async-storage'

import { UserProfile } from '../+model/profile'
import { navigateToUser } from '../Login/actions'
import { checkAuthFailAction, checkAuthSuccessAction } from './actions'
import { TCheckAuth } from './actionTypes'
import { CHECK_AUTH_REQUEST } from './constants'

interface ICheckAuth {
  getUserProfile: () => Observable<UserProfile>
  LocalStorage: ILocalStorage
}

export const checkAuthEpic: any = (
  action$: ActionsObservable<TCheckAuth>,
  store: any,
  { getUserProfile, LocalStorage }: ICheckAuth
) => {
  return action$.pipe(
    ofType(CHECK_AUTH_REQUEST),
    exhaustMap((a) => {
      api.setHeaders({ Authorization: a.token })

      return getUserProfile().pipe(
        concatMap((user) => {
          return of(checkAuthSuccessAction(user))
        }),
        concat(of(navigateToUser())),
        catchError((err: any) => {
          Alert.alert('Không thể lấy thông tin người dùng')
          return of(checkAuthFailAction())
        })
      )
    })
  )
}
