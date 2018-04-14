import { Action } from 'redux'
import { ActionsObservable, ofType } from 'redux-observable'
import { Observable } from 'rxjs/Observable'
import { exhaustMap, mapTo, tap } from 'rxjs/operators'

import { LoginModel } from './model'

interface IGetUserProfile {
    getUserProfile: (url: string) => Observable<LoginModel>
}

export const accountEpic = (
  action$: ActionsObservable<Action>,
  store: any,
  { getUserProfile }: IGetUserProfile
): Observable<Action> => {
  return action$.pipe(
    ofType('START_LOADING'),
    exhaustMap((a) => getUserProfile('posts/1').pipe(
        tap((result) => console.log('response', result.body))
    )),
    mapTo({type: 'NOTHING'})
  )
}
