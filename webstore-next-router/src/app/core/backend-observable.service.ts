import { Injectable } from '@angular/core';
import { BackendService, RestResponse, getCollectionPath } from './backend.service';
import { Identifiable, IdType, ResourceType } from '../shared/shared-types';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { LoggerService } from './logger.service';
import { map, tap, catchError, filter } from 'rxjs/operators';
import { retryAfter } from '../shared/rx-operators';
import { API_BASE_URL } from './constants';

@Injectable()
export class BackendObservableService implements BackendService {

  constructor(private http: HttpClient,
    private logger: LoggerService) { }

  findAll<T extends Identifiable>(kind: ResourceType<T>): Observable<T[]> {
    const collectionPath = getCollectionPath(kind.typeId);
    const uri = `${API_BASE_URL}/${collectionPath}`;
    return this.http
      .get<RestResponse<T[]>>(uri, {headers:  new HttpHeaders({'x-refresh':  'true'})})
      .pipe(
        map(productResponse => productResponse.data),
        tap(entities => this.logger.log(`${kind.typeId}s: ${JSON.stringify(entities)}.`)),
        retryAfter(2, 1000),
        catchError(this.handleError),
      );
  }

  findById<T extends Identifiable>(kind: ResourceType<T>, id: IdType): Observable<T> {
    const collectionPath = getCollectionPath(kind.typeId);
    const uri = `${API_BASE_URL}/${collectionPath}/${id}`;
    return this.http
      .get<T>(uri, {headers:  new HttpHeaders({'x-refresh':  'true'})})
      .pipe(
        tap(entity => this.logger.log(`${kind.typeId}: ${JSON.stringify(entity)}.`)),
        retryAfter(2, 1000),
        catchError(this.handleError),
      );
  }

  create<T extends Identifiable>(kind: ResourceType<T>, item: T): Observable<T> {
    const collectionPath = getCollectionPath(kind.typeId);
    const uri = `${API_BASE_URL}/${collectionPath}`;
    return this.http
      .post<T>(uri, item)
      .pipe(
        tap(entity => this.logger.log(`Created ${kind.typeId}: ${JSON.stringify(entity)}`)),
        catchError(this.handleError),
      );
  }

  update<T extends Identifiable>(kind: ResourceType<T>, item: T): Observable<T> {
    const collectionPath = getCollectionPath(kind.typeId);
    const uri = `${API_BASE_URL}/${collectionPath}/${item.id}`;
    return this.http
      .put<T>(uri, item)
      .pipe(
        tap(entity => this.logger.log(`Updated ${kind.typeId}: ${JSON.stringify(entity)}.`)),
        retryAfter(2, 1000),
        catchError(this.handleError),
      );
  }

  delete<T extends Identifiable>(kind: ResourceType<T>, id: IdType): Observable<T> {
    const collectionPath = getCollectionPath(kind.typeId);
    const uri = `${API_BASE_URL}/${collectionPath}/${id}`;
    return this.http
      .delete<T>(uri)
      .pipe(
        tap(entity => this.logger.log(`Deleted ${kind.typeId}: ${JSON.stringify(entity)}.`)),
        retryAfter(2, 1000),
        catchError(this.handleError),
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
      // return an observable with a user-facing error message
      return throwError('Unable to connecting with the server. Try again later.');
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${JSON.stringify(error.error)}`);
        if (error.status >= 500) {
          // return an observable with a user-facing error message
          return throwError('There was a problem with the server. Try again later.');
        } else if (error.status === 403) {
          return throwError('Insufficient privileges. Access not allowed.');
        } else {
          return throwError('Operation failed. Correct data and try again.');
        }
    }
  }


}
