import { Injectable, Type } from '@angular/core';
import { LoggerService } from './logger.service';
import { Product } from '../products/product.model';
import { PRODUCTS, COLLECTION_TYPES } from './products-mock-data';
import { Identifiable, CollectionResponse, IndividualResponse } from '../shared/common-types';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
// tslint:disable-next-line:import-blacklist
// import 'rxjs/Rx';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/do';
import { catchError, map, tap, retry } from 'rxjs/operators';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { Observable } from 'rxjs/Observable';

const API_URL = 'http://localhost:4200/api/';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};

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
      retry(3), // retry a failed request up to 3 times
      catchError(this.handleError)
    ).toPromise();

      // .map(productsResponse => productsResponse['data'])
      // .do(products => this.logger.log(products))
      // .toPromise<T[]>();
  }

  find<T extends Identifiable> (type: Type<T>, id: KeyType): Promise<T[]> {
    if (COLLECTION_TYPES.indexOf(type) < 0) {
      return Promise.reject(`Cannot recognize entity type: ${type.name}`);
    }
    const collection = this.getCollectionName(type);
    this.logger.log(`BackendService called for ${collection}/${id}.`);
    const url = API_URL + collection + '/' + id;
    return this.http.get<IndividualResponse<T>>(url)
    .pipe(
      map(productsResponse => productsResponse.data),
      tap(products => this.logger.log(products)),
      retry(3), // retry a failed request up to 3 times
      catchError(this.handleError)
    ).toPromise();
  }

  /** POST: add a new product */
  add <T extends Identifiable> (type: Type<T>, item: T): Promise<T> {
    if (COLLECTION_TYPES.indexOf(type) < 0) {
      return Promise.reject(`Cannot recognize entity type: ${type.name}`);
    }
    const collection = this.getCollectionName(type);
    this.logger.log(`BackendService called for ${collection}.`);
    const url = API_URL + collection;
    return this.http.post<IndividualResponse<T>>(url, item, httpOptions)
    .pipe(
      map(productsResponse => productsResponse.data),
      catchError(this.handleError)
    ).toPromise();
  }

  /** DELETE: delete the hero from the server */
  delete<T extends Identifiable> (type: Type<T>, id: KeyType): Promise<T> {
    if (COLLECTION_TYPES.indexOf(type) < 0) {
      return Promise.reject(`Cannot recognize entity type: ${type.name}`);
    }
    const collection = this.getCollectionName(type);
    this.logger.log(`BackendService called for ${collection}/${id}.`);
    const url = API_URL + collection + '/' + id;
    return this.http.delete<IndividualResponse<T>>(url, httpOptions)
      .pipe(
        map(productsResponse => productsResponse.data),
        catchError(this.handleError)
      ).toPromise();
  }

  /** PUT: update the hero on the server. Returns the updated hero upon success. */
  update <T extends Identifiable> (type: Type<T>, item: T): Promise<T> {
    httpOptions.headers =
      httpOptions.headers.set('Authorization', 'my-auth-token');
      if (COLLECTION_TYPES.indexOf(type) < 0) {
        return Promise.reject(`Cannot recognize entity type: ${type.name}`);
      }
      const collection = this.getCollectionName(type);
      this.logger.log(`BackendService called for ${collection}/${item.id}.`);
      const url = API_URL + collection + '/' + item.id;
      return this.http.put<IndividualResponse<T>>(url, httpOptions)
        .pipe(
          map(productsResponse => productsResponse.data),
          catchError(this.handleError)
        ).toPromise();
  }

  private getCollectionName<T extends Identifiable> (type: Type<T>): Observable<string> {
    if (COLLECTION_TYPES.indexOf(type) < 0) {
      return Promise.reject(`Cannot recognize entity type: ${type.name}`);
    }
    const collection = type.name.toLowerCase() + 's';
    this.logger.log(`BackendService called for ${collection}.`);
    return new Observable();
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Client-side or network error
      console.error('Client-side error occurred:', error.error.message);
    } else {
      // Backend unsuccessful status code.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${JSON.stringify(error.error)},
        message was: ${JSON.stringify(error.message)}`);
    }
    // return ErrorObservable with a user-facing error message
    return new ErrorObservable(
      'There was a problem accessing the backend service. Please try again later.');
  }

}



