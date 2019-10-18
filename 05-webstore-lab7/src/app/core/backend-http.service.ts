import { Injectable } from '@angular/core';
import { BackendService } from './backend.service';
import { Identifiable, ResourceType } from '../shared/common-types';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, tap, catchError, retry } from 'rxjs/operators';
import { retryAfter } from '../shared/rx-operators';

export const BASE_API_URL = 'http://localhost:4200/api';

export const ENTITY_TO_URL_MAP = {
  'Product': 'products',
  'User': 'users'
};

export interface RestResponse<R> {
  data: R;
}

@Injectable()
export class BackendHttpService implements BackendService {

  constructor(private http: HttpClient) { }

  find<T extends Identifiable>(kind: ResourceType<T>): Observable<T[]> {
    const url = `${BASE_API_URL}/${this.getCollectionUrl(kind)}`;
    return this.http.get<RestResponse<T[]>>(url).pipe(
      map(resp => resp.data),
      tap(entities => console.log(entities)),
      retryAfter(3, 1000),
      catchError(this.handleError)
    );
  }
  findById<T extends Identifiable>(kind: ResourceType<T>, id: string): Observable<T> {
    const url = `${BASE_API_URL}/${this.getCollectionUrl(kind)}/${id}`;
    return this.http.get<RestResponse<T>>(url).pipe(
      map(resp => resp.data),
      tap(e => console.log(`Product fetched: ${JSON.stringify(e)}`)),
      catchError(this.handleError)
    );
  }
  add<T extends Identifiable>(kind: ResourceType<T>, entity: T): Observable<T> {
    const url = `${BASE_API_URL}/${this.getCollectionUrl(kind)}`;
    return this.http.post<RestResponse<T>>(url, entity).pipe(
      map(resp => resp.data),
      tap(e => console.log(`Product created: ${JSON.stringify(e)}`)),
      catchError(this.handleError)
    );
  }
  update<T extends Identifiable>(kind: ResourceType<T>, entity: T): Observable<T> {
    const url = `${BASE_API_URL}/${this.getCollectionUrl(kind)}/${entity.id}`;
    return this.http.put<RestResponse<T>>(url, entity).pipe(
      map(resp => resp.data),
      tap(e => console.log(`Product updated: ${JSON.stringify(e)}`)),
      catchError(this.handleError)
    );
  }
  delete<T extends Identifiable>(kind: ResourceType<T>, id: string): Observable<T> {
    const url = `${BASE_API_URL}/${this.getCollectionUrl(kind)}/${id}`;
    return this.http.delete<RestResponse<T>>(url).pipe(
      map(resp => resp.data),
      tap(e => console.log(`Product deleted: ${JSON.stringify(e)}`)),
      catchError(this.handleError)
    );
  }

  protected getCollectionUrl<T extends Identifiable>(kind: ResourceType<T>): string {
    return ENTITY_TO_URL_MAP[kind.typeId];
  }

  protected handleError(error: HttpErrorResponse) {
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
