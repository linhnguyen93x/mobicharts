import { Observable } from 'rxjs/Observable'
import { of } from 'rxjs/observable/of'
import { _throw } from 'rxjs/observable/throw'
import { catchError, concat } from 'rxjs/operators'
import { SUBMIT_LOADER } from 'src/+state/constants'
import { endLoading, startLoading } from 'src/+state/loadingActions'

export const startLoader = <T>(obs: Observable<T>, hideSpinner?: boolean) => {
  const source = Observable.from(of(startLoading(SUBMIT_LOADER, 'Đang tải', hideSpinner)))

  return source.take(1).merge(
    obs.pipe(
      concat(of(endLoading(SUBMIT_LOADER))),
      catchError((err) => {

        return _throw(err)
      })
    )
  )
}
