import { Injectable, Type } from '@angular/core';
import { LoggerService } from './logger.service';
import { Product } from '../products/product.model';
import { Identifiable, CollectionResponse } from '../shared/common-types';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
// tslint:disable-next-line:import-blacklist
// import 'rxjs/Rx';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/do';
import { catchError, map, tap, retry, delay, take, retryWhen, concat } from 'rxjs/operators';
import { COLLECTION_TYPES } from './collection-types';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { Observable } from 'rxjs/Observable';


const API_URL = 'http://localhost:4200/apixx/';

@Injectable()
export class BackendService {
  constructor(private http: HttpClient, private logger: LoggerService) {}

  findAll<T extends Identifiable> (type: Type<T>): Promise<T[]> {
    if (COLLECTION_TYPES.indexOf(type) < 0) {
      return Promise.reject(`Cannot recognize entity type: ${type.name}`);
    }
    const collection = this.getCollectionName(type);
    this.logger.log(`BackendService called for ${collection}.`);
    const url = API_URL + collection;
    return this.http.get<CollectionResponse<T>>(url)
    .pipe(
      map(productsResponse => productsResponse.data),
      tap(products => this.logger.log(products)),
      catchError(this.handleError),
      retryWhen(errors => errors.pipe(delay(1000), take(5),
        concat(new ErrorObservable('There was a problem with backend service. Try again later.')))),
    ).toPromise();

      // .map(productsResponse => productsResponse['data'])
      // .do(products => this.logger.log(products))
      // .toPromise<T[]>();
  }

  private getCollectionName<T extends Identifiable> (type: Type<T>): string {
    return  type.name.toLowerCase() + 's';
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Client-side or network error
      console.error('Client-side error:', error.error.message);
    } else {
      // Backend unsuccessful status code.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${JSON.stringify(error.error)},
        message was: ${JSON.stringify(error.message)}`);
    }
    // return ErrorObservable with a user-facing error message
    return new ErrorObservable('There was a problem with backend service. Try again later.');
  }


}



