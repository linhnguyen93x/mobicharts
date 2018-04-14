import { Observable } from 'rxjs/Observable'
import { ajax } from 'rxjs/observable/dom/ajax'
import { catchError, map } from 'rxjs/operators'

import { AccountApi } from './modules/Account/account.api'

class ApiService {
  HOST_URL = 'http://lms.fcv-etools.com'

  request = <T>(prefix: string, body?: T): Observable<object> => {
    return ajax({
      url: this.HOST_URL + prefix,
      method: 'POST',
      body,
      headers: { appVersion: 1.0 }
    }).pipe(
      map((res) => {
        return res.response
      }),
      catchError((err) => {
        console.info('API ERROR:', err)
        return Observable.throw(err)
      })
    )
  }

  getHeaders(): object {
    return {}
  }
}

export const api = new ApiService()

export default {
  ...AccountApi
}
