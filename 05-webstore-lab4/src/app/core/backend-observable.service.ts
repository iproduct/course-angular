import { Injectable, Type, Inject } from '@angular/core';
import { BackendService } from './backend.service';
import { Identifiable, IdType } from '../shared/shared-types';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { LoggerService } from './logger.service';
import { API_ENDPOINTS, BASE_API_URI } from './api-endpoints-map';
import { CustomResponse } from './common-types';
import { map, tap, catchError } from 'rxjs/operators';
import { retryAfter } from '../shared/rx-operators';

@Injectable()
export class BackendObservableService implements BackendService {

  constructor(private http: HttpClient,
    private logger: LoggerService) { }

  findAll<T extends Identifiable>(kind: Type<T>): Observable<T[]> {
    const uri = BASE_API_URI + API_ENDPOINTS[kind.name];
    return this.http
      .get<CustomResponse<T[]>>(uri, {headers:  new HttpHeaders({'x-refresh':  'true'})})
      .pipe(
        map(productResponse => productResponse.data),
        tap(entities => this.logger.log(`Entities: ${JSON.stringify(entities)}.`)),
        retryAfter(3, 1000),
        catchError(this.handleError),
      );
  }

  findById<T extends Identifiable>(kind: Type<T>, id: IdType): Observable<T> {
    const uri = `${BASE_API_URI}${API_ENDPOINTS[kind.name]}/${id}`;
    return this.http
      .get<CustomResponse<T>>(uri, {headers:  new HttpHeaders({'x-refresh':  'true'})})
      .pipe(
        map(productResponse => productResponse.data),
        tap(entity => this.logger.log(`Entity: ${JSON.stringify(entity)}.`)),
        retryAfter(3, 1000),
        catchError(this.handleError),
      );
  }

  create<T extends Identifiable>(kind: Type<T>, item: T): Observable<T> {
    const uri = `${BASE_API_URI}${API_ENDPOINTS[kind.name]}`;
    return this.http
      .post<CustomResponse<T>>(uri, item)
      .pipe(
        map(productResponse => productResponse.data),
        tap(entity => this.logger.log(`Created: ${JSON.stringify(entity)}`)),
        catchError(this.handleError),
      );
  }

  update<T extends Identifiable>(kind: Type<T>, item: T): Observable<T> {
    const uri = `${BASE_API_URI}${API_ENDPOINTS[kind.name]}/${item.id}`;
    return this.http
      .put<CustomResponse<T>>(uri, item)
      .pipe(
        tap(entity => this.logger.log(`Response: ${JSON.stringify(entity)}.`)),
        map(productResponse => productResponse.data),
        tap(entity => this.logger.log(`Updated: ${JSON.stringify(entity)}.`)),
        retryAfter(3, 1000),
        catchError(this.handleError),
      );
  }

  remove<T extends Identifiable>(kind: Type<T>, id: IdType): Observable<T> {
    const uri = `${BASE_API_URI}${API_ENDPOINTS[kind.name]}/${id}`;
    return this.http
      .delete<CustomResponse<T>>(uri)
      .pipe(
        map(productResponse => productResponse.data),
        tap(entity => this.logger.log(`Deleted: ${JSON.stringify(entity)}.`)),
        retryAfter(3, 1000),
        catchError(this.handleError),
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${JSON.stringify(error.error)}`);
    }
    // return an observable with a user-facing error message
    return throwError('There was a problem with backend service. Try again later.');
  }


}
