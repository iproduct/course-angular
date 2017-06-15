import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { getBaseApiUrl } from '../constants';
import { RequestBase } from '../common/request-base';

@Injectable()
export class LoginService extends RequestBase {
  constructor(public http: Http) {
    super(http);
  }

  logout(): Observable<string> {
    return this.http.get(`${getBaseApiUrl()}/logout`, this.optionsNoPre)
      .map(res => res.text());
  }
}
