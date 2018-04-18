import { Alert } from 'react-native'
import { ActionsObservable, ofType } from 'redux-observable'
import { Observable } from 'rxjs/Observable'
import { of } from 'rxjs/observable/of'
import { catchError, concat, concatMap, exhaustMap } from 'rxjs/operators'
import { SUBMIT_LOADER } from 'src/+state/constants'
import { endLoading } from 'src/+state/loadingActions'
import { api } from 'src/api'
import { ILocalStorage } from 'src/shared/async-storage'

import { UserProfile } from '../+model'
import { loginSuccess, navigateToUser } from './actions'
import { TLoginAction } from './actionTypes'
import { LOGIN_REQUEST } from './constants'
import { LoginRequest } from './model'

interface ILogin {
  login: (body: LoginRequest) => Observable<UserProfile>
  startLoader: <T>(obs: Observable<T>, hideSpinner: boolean) => Observable<T>
  LocalStorage: ILocalStorage
}

export const accountEpic: any = (
  action$: ActionsObservable<TLoginAction>,
  store: any,
  { login, LocalStorage, startLoader }: ILogin
) => {
  return action$.pipe(
    ofType(LOGIN_REQUEST),
    exhaustMap((a) =>
      startLoader(
        login(a.payload)
          .delay(300)
          .pipe(
            concatMap((info) => {
              api.setHeaders({ Authorization: info.jwt })
              LocalStorage.setItem('jwt', info.jwt)
              return of(loginSuccess(info))
            })
          ),
        true
      ).pipe(
        concat(of(navigateToUser())),
        catchError((e) => {
          Alert.alert('Thông báo', 'Tên đăng nhập hoặc mật khẩu không đúng.')
          return of(endLoading(SUBMIT_LOADER))
        })
      )
    )
  )
}
