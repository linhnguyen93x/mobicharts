import { Observable } from 'rxjs/Observable'
import { ajax } from 'rxjs/observable/dom/ajax'
import { empty } from 'rxjs/observable/empty'
import { catchError, map } from 'rxjs/operators'

import { AccountApi } from './modules/Account/account.api'

class ApiService {
  HOST_URL = 'https://jsonplaceholder.typicode.com/'

  request = <T>(prefix: string, body?: T): Observable<object> => {
    return ajax({ url: this.HOST_URL + prefix }).pipe(
      map((res) => {
        return res.response
      }),
      catchError((err) => {
        console.info('API ERROR:', err)
        return empty()
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
