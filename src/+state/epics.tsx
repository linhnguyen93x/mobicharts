import { Action, MiddlewareAPI } from 'redux'
import { ActionsObservable, combineEpics } from 'redux-observable'
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import { Observable } from 'rxjs/Observable'
import { checkEpic$ } from 'src/modules/Account/+state/epics'

export const appEpic$ = new BehaviorSubject(combineEpics<any>(...checkEpic$))

const AppEpic = (
  action$: ActionsObservable<Action>,
  store: MiddlewareAPI<any>,
  api: any
): Observable<Action> => appEpic$.mergeMap((epic) => epic(action$, store, api))

export default AppEpic
