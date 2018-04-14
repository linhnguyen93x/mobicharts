import { Alert } from 'react-native'
import { ActionsObservable, ofType } from 'redux-observable'
import { Observable } from 'rxjs/Observable'
import { merge } from 'rxjs/observable/merge'
import { of } from 'rxjs/observable/of'
import { catchError, concat, concatMap, exhaustMap } from 'rxjs/operators'
import { SUBMIT_LOADER } from 'src/+state/constants'
import { endLoading, startLoading } from 'src/+state/loadingActions'

import { loginSuccess, navigateToUser } from './actions'
import { TLoginAction } from './actionTypes'
import { LOGIN_REQUEST } from './constants'
import { LoginModel, LoginRequest } from './model'

interface ILogin {
  login: (body: LoginRequest) => Observable<LoginModel>
}

export const accountEpic = (
  action$: ActionsObservable<TLoginAction>,
  store: any,
  { login }: ILogin
) => {
  return action$.pipe(
    ofType(LOGIN_REQUEST),
    exhaustMap((a) =>
      merge(
        of(startLoading(SUBMIT_LOADER, 'Đang tải', true)),
        login(a.payload).delay(300).pipe(
          concatMap((info) => of(loginSuccess(info))),
          concat(
            of(endLoading(SUBMIT_LOADER)),
            of(navigateToUser())
          ),
          // map((info) => loginSuccess(info)),
          // mapTo(endLoading(SUBMIT_LOADER)),
          // mapTo(navigateToUser()),
          catchError((e) => {
            Alert.alert('Thông báo', 'Lỗi đăng nhập')
            return of(endLoading(SUBMIT_LOADER))
          })
        )
      )
    )
  )
}
