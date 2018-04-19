import { Observable } from 'rxjs/Observable'
import { ajax } from 'rxjs/observable/dom/ajax'
import { of } from 'rxjs/observable/of'
import { catchError, exhaustMap } from 'rxjs/operators'

import { AccountApi } from './modules/Account/account.api'

interface IHeaders {
  [x: string]: any
}

class ApiService {
  private HOST_URL = 'http://hochiminh.mobifone.vn/bi_report'
  private headers: IHeaders = {
    appVersion: 1.0
  }

  request = <T>(prefix: string, body?: T, options?: any): Observable<any> => {

    return ajax({
      url: this.HOST_URL + prefix,
      method: 'POST',
      body,
      headers: this.getHeaders()
    }).pipe(
      exhaustMap((res) => {
        if (res.response && res.response.formDataJson) {
          return of(res.response)
        }
        return Observable.throw(res.response)
      }),
      catchError((err) => {
        console.info('ERR:', err)
        return Observable.throw(err)
      })
    )
  }

  public setHeaders(params: object) {
    this.headers = {...this.headers, params}
  }

  private getHeaders() {
    return this.headers
  }

}

export const api = new ApiService()

export default {
  ...AccountApi
}
