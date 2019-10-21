import { Injectable } from '@angular/core';
import { BackendService } from './backend.service';
import { Identifiable, ResourceType } from '../shared/shared-types';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, tap, catchError, retry } from 'rxjs/operators';

export const BASE_API_URL = 'http://localhost:4200/api/';
export const COLLECTION_TO_URL_MAP = {
  'Product': 'products',
  'User': 'users'
};

export interface RestResponse<T> {
  data: T;
}

@Injectable()
export class BackendHttpService implements BackendService {
  constructor(private http: HttpClient) { }

  findAll<T extends Identifiable>(kind: ResourceType<T>): Observable<T[]> {
    const url = BASE_API_URL + this.getCollectionName(kind);
    return this.http.get<RestResponse<T[]>>(url).pipe(
      map(resp => resp.data),
      tap(entities => console.log(entities)),
      retry(3),
      catchError(this.handleError)
    );
  }
  findById<T extends Identifiable>(kind: ResourceType<T>, id: string): Observable<T> {
    const url = `${BASE_API_URL}${this.getCollectionName(kind)}/${id}`;
    return this.http.get<RestResponse<T>>(url).pipe(
      map(resp => resp.data),
      tap(fetched => console.log(`Entity fetched ${JSON.stringify(fetched)}`)),
      catchError(this.handleError)
    );
  }
  add<T extends Identifiable>(kind: ResourceType<T>, entity: T): Observable<T> {
    const url = BASE_API_URL + this.getCollectionName(kind);
    return this.http.post<RestResponse<T>>(url, entity).pipe(
      map(resp => resp.data),
      tap(created => console.log(created)),
      catchError(this.handleError)
    );
  }
  update<T extends Identifiable>(kind: ResourceType<T>, entity: T): Observable<T> {
    const url = `${BASE_API_URL}${this.getCollectionName(kind)}/${entity.id}`;
    return this.http.put<RestResponse<T>>(url, entity).pipe(
      map(resp => resp.data),
      tap(updated => console.log(`Entity updated ${JSON.stringify(updated)}`)),
      catchError(this.handleError)
    );
  }
  delete<T extends Identifiable>(kind: ResourceType<T>, id: string): Observable<T> {
    const url = `${BASE_API_URL}${this.getCollectionName(kind)}/${id}`;
    return this.http.delete<RestResponse<T>>(url).pipe(
      map(resp => resp.data),
      tap(deleted => console.log(`Entity deleted ${JSON.stringify(deleted)}`)),
      catchError(this.handleError)
    );
  }

  protected getCollectionName<T extends Identifiable>(kind: ResourceType<T>): string {
    return COLLECTION_TO_URL_MAP[kind.typeId];
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
