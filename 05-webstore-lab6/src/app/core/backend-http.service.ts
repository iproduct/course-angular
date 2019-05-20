import { Injectable, Type } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ResourceType, IdType, Identifiable } from '../shared/common-types';
import { ENTITY_URLS } from './constants';
import { map, tap, catchError, delay, take, concatMap, retryWhen } from 'rxjs/operators';

interface HttpResult<T> {
  data: T;
}

@Injectable({
  providedIn: 'root'
})
export class BackendHttpService {

  constructor(private http: HttpClient) { }

  findAll<T extends Identifiable>(type: ResourceType<T>): Observable<T[]> {
    if (!ENTITY_URLS[type.typeId]) {
      return throwError(`Cannot recognize entity type: ${type.typeId}`);
    }
    const url = ENTITY_URLS[type.typeId];
    return this.http.get<HttpResult<T[]>>(url).pipe(
      map(response => response.data),
      tap(entities => console.log(`${type}s fetched: ${entities}`)),
      catchError(this.handleError),
      retryWhen(errors => errors.pipe(
        delay(1000),
        take(3),
        concatMap(err => throwError('There was a problem with backend service. Try again later.')))
      )
    );
  }

  findById<T extends Identifiable>(type: ResourceType<T>, id: IdType): Observable<T> {
    if (!ENTITY_URLS[type.typeId]) {
      return throwError(`Cannot recognize entity type: ${type.typeId}`);
    }
    const url = `${ENTITY_URLS[type.typeId]}/${id}`;
    return this.http.get<T>(url).pipe(
      tap(entity => console.log(`${type} fetched: ${entity}`)),
      catchError(this.handleError),
      retryWhen(errors => errors.pipe(
        delay(1000),
        take(3),
        concatMap(err => throwError('There was a problem with backend service. Try again later.')))
      )
    );
  }

  create<T extends Identifiable>(type: ResourceType<T>, entity: T): Observable<T> {
    if (!ENTITY_URLS[type.typeId]) {
      return throwError(`Cannot recognize entity type: ${type.typeId}`);
    }
    const url = ENTITY_URLS[type.typeId];
    return this.http.post<T>(url, entity).pipe(
      tap(created => console.log(`New ${type} created: ${created}`)),
      catchError(this.handleError),
    );
  }

  update<T extends Identifiable>(type: ResourceType<T>, entity: T): Observable<T> {
    if (!ENTITY_URLS[type.typeId]) {
      return throwError(`Cannot recognize entity type: ${type.typeId}`);
    }
    const url = `${ENTITY_URLS[type.typeId]}/${entity.id}`;
    return this.http.put<T>(url, entity).pipe(
      tap(created => console.log(`${type} updated: ${created}`)),
      catchError(this.handleError),
      retryWhen(errors => errors.pipe(
        delay(1000),
        take(3),
        concatMap(err => throwError('There was a problem with backend service. Try again later.')))
      )
    );
  }

  delete<T extends Identifiable>(type: ResourceType<T>, id: IdType): Observable<T> {
    if (!ENTITY_URLS[type.typeId]) {
      return throwError(`Cannot recognize entity type: ${type.typeId}`);
    }
    const url = `${ENTITY_URLS[type.typeId]}/${id}`;
    return this.http.delete<T>(url).pipe(
      tap(entity => console.log(`${type} deleted: ${entity}`)),
      catchError(this.handleError),
    );
  }


  private handleError(error: HttpErrorResponse) {
    console.log(error);
    if (error.error instanceof ErrorEvent) {
      // Client-side or network error
      console.error('Client-side error:', error.error.message);
    } else {
      // Backend unsuccessful status code.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${JSON.stringify(error.error || error)},
        message was: ${JSON.stringify(error.message)}`);
    }
    // return ErrorObservable with a user-facing error message
    return throwError('Error performing the operation. Correct data and try again.');
  }
}
