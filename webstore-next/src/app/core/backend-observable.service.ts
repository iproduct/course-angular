import { Injectable, Type, Inject } from '@angular/core';
import { BackendService } from './backend.service';
import { Identifiable, IdType, ResourceType } from '../shared/shared-types';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { LoggerService } from './logger.service';
import { map, tap, catchError } from 'rxjs/operators';
import { retryAfter } from '../shared/rx-operators';
import { ServiceResponse, getCollectionPath } from './http-utils';
import { environment } from 'src/environments/environment';

@Injectable()
export class BackendObservableService implements BackendService {
  protected apiBaseUrl = `${environment.scheme}://${environment.domain}:${environment.port}/api`;

  constructor(private http: HttpClient,
    private logger: LoggerService) { }

  findAll<T extends Identifiable>(kind: ResourceType<T>): Observable<T[]> {
    const collectionPath = getCollectionPath(kind.typeId);
    const uri = `${this.apiBaseUrl}/${collectionPath}`;
    return this.http
      .get<ServiceResponse<T[]>>(uri, {headers:  new HttpHeaders({'x-refresh':  'true'})})
      .pipe(
        map(productResponse => productResponse.data),
        tap(entities => this.logger.log(`${kind.typeId}s: ${JSON.stringify(entities)}.`)),
        retryAfter(2, 1000),
        catchError(this.handleError),
      );
  }

  findById<T extends Identifiable>(kind: ResourceType<T>, id: IdType): Observable<T> {
    const collectionPath = getCollectionPath(kind.typeId);
    const uri = `${this.apiBaseUrl}/${collectionPath}/${id}`;
    return this.http
      .get<ServiceResponse<T>>(uri, {headers:  new HttpHeaders({'x-refresh':  'true'})})
      .pipe(
        map(productResponse => productResponse.data),
        tap(entity => this.logger.log(`${kind.typeId}: ${JSON.stringify(entity)}.`)),
        retryAfter(2, 1000),
        catchError(this.handleError),
      );
  }

  create<T extends Identifiable>(kind: ResourceType<T>, item: T): Observable<T> {
    const collectionPath = getCollectionPath(kind.typeId);
    const uri = `${this.apiBaseUrl}/${collectionPath}`;
    return this.http
      .post<ServiceResponse<T>>(uri, item)
      .pipe(
        map(productResponse => productResponse.data),
        tap(entity => this.logger.log(`Created ${kind.typeId}: ${JSON.stringify(entity)}`)),
        catchError(this.handleError),
      );
  }

  update<T extends Identifiable>(kind: ResourceType<T>, item: T): Observable<T> {
    const collectionPath = getCollectionPath(kind.typeId);
    const uri = `${this.apiBaseUrl}/${collectionPath}/${item.id}`;
    return this.http
      .put<ServiceResponse<T>>(uri, item)
      .pipe(
        tap(entity => this.logger.log(`Response: ${JSON.stringify(entity)}.`)),
        map(productResponse => productResponse.data),
        tap(entity => this.logger.log(`Updated ${kind.typeId}: ${JSON.stringify(entity)}.`)),
        retryAfter(2, 1000),
        catchError(this.handleError),
      );
  }

  delete<T extends Identifiable>(kind: ResourceType<T>, id: IdType): Observable<T> {
    const collectionPath = getCollectionPath(kind.typeId);
    const uri = `${this.apiBaseUrl}/${collectionPath}/${id}`;
    return this.http
      .delete<ServiceResponse<T>>(uri)
      .pipe(
        map(productResponse => productResponse.data),
        tap(entity => this.logger.log(`Deleted ${kind.typeId}: ${JSON.stringify(entity)}.`)),
        retryAfter(2, 1000),
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
