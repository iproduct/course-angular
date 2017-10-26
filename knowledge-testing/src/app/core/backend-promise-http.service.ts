import { Injectable, Inject, Type } from '@angular/core';
import { API_BASE_URL } from '../shared/constants';
import { HttpClient } from '@angular/common/http';
import { LoggerService } from './logger.service';
import { BackendPromiseService } from './backend-promise.service';
import { Identifiable, IdentityType } from '../shared/shared-types';
// import 'rxjs/operator/map';
import 'rxjs/Rx';

@Injectable()
export class BackendPromiseHttpService implements BackendPromiseService {

  constructor(
    @Inject(API_BASE_URL) private baseUrl: string,
    private http: HttpClient,
    private logger: LoggerService
  ) { }

  find <T extends Identifiable>(type: Type<T>, id: IdentityType): Promise<T> {
    return this.http.get<T>(this.baseUrl + '/' + this.getCollectionName(type) + '/' + id)
      .toPromise();
  }

  findAll<T extends Identifiable>(type: Type<T>): Promise<T[]> {
    return this.http.get<{data: T[]}>(this.baseUrl + '/' + this.getCollectionName(type))
      .map( json => json.data)
      .toPromise();
  }

  add<T extends Identifiable>(type: Type<T>, item: T): Promise<T> {
    return this.http.post<T>(this.baseUrl + '/' + this.getCollectionName(type), item)
      .toPromise();
  }
  edit<T extends Identifiable>(type: Type<T>, item: T): Promise<T> {
    return this.http.put<T>(this.baseUrl + '/' + this.getCollectionName(type) + '/' + item.id, item)
      .toPromise();
  }
  delete<T extends Identifiable>(type: Type<T>, id: IdentityType): Promise<T> {
    return this.http.delete<T>(this.baseUrl + '/' + this.getCollectionName(type) + '/' + id)
      .toPromise();
}

  private getCollectionName<T>(type: Type<T>) {
    return type.name + 's';
  }

  // private handleErrorObservable<T>(error: Response | any) {
  //   let errMsg: string;
  //   if (error instanceof Response) {
  //     const body = error.json() || '';
  //     const err = body.error || JSON.stringify(body);
  //     errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
  //   } else {
  //     errMsg = error.message ? error.message : error.toString();
  //   }
  //   // in a real world app, we may send the error to some remote logging infrastructure
  //   console.error(errMsg);
  //   return Observable.throw(errMsg);
  // }

  // private handleErrorPromise(error: any) {
  //   // in a real world app, we may send the error to some remote logging infrastructure
  //   let errMsg: string;
  //   if (error instanceof Response) {
  //     const body = error.json() || '';
  //     const err = body.error || JSON.stringify(body);
  //     errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
  //   } else {
  //     errMsg = error.message ||  error.json().error || error.toString();
  //   }
  //   console.error( errMsg );
  //   return Promise.reject(errMsg);
  // }

}
