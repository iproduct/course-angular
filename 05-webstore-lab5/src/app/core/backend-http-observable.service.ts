import { Injectable, Inject, forwardRef } from '@angular/core';
import { Identifiable, ResourseType, IdType } from '../shared/shared-types';
import { environment } from '../../environments/environment';
import { map, tap, catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { BackendService } from './backend.service';
import { retryAfter } from '../shared/rx-operators';

export interface RestResponse<T> {
  data: T;
}

@Injectable()
export class BackendHtpObservableService implements BackendService {
  protected apiBaseUrl = `${environment.scheme}://${environment.domain}:${environment.port}/api`;

  constructor(private http: HttpClient) {}

  findAll<T extends Identifiable> (kind: ResourseType<T>): Observable<T[]> {
    const collectionPath = this.getCollectionPath(kind.typeId);
    return this.http.get<RestResponse<T[]>>(`${this.apiBaseUrl}/${collectionPath}`)
      .pipe(
        map(resp => resp.data),
        tap(data => console.log(data)),
        retryAfter(2, 1000),
        catchError(this.handleError)
      );
  }

  findById<T extends Identifiable>(kind: ResourseType<T>, id: string): Observable<T> {
    const collectionPath = this.getCollectionPath(kind.typeId);
    return this.http.get<RestResponse<T>>(`${this.apiBaseUrl}/${collectionPath}/${id}`)
      .pipe(
        map(resp => resp.data),
        tap(data => console.log(`GET ${kind.typeId}: ${JSON.stringify(data)}`)),
        retryAfter(2, 1000),
        catchError(this.handleError)
      );
  }

  add<T extends Identifiable> (kind: ResourseType<T>, entity: T): Observable<T> {
    const collectionPath = this.getCollectionPath(kind.typeId);
    return this.http.post<RestResponse<T>>(`${this.apiBaseUrl}/${collectionPath}`, entity)
      .pipe(
        map(resp => resp.data),
        tap(data => console.log(`Created ${kind.typeId}: ${JSON.stringify(data)}`)),
        catchError(this.handleError)
      );
  }

  update<T extends Identifiable> (kind: ResourseType<T>, entity: T): Observable<T> {
    const collectionPath = this.getCollectionPath(kind.typeId);
    return this.http.put<RestResponse<T>>(`${this.apiBaseUrl}/${collectionPath}/${entity.id}`, entity)
      .pipe(
        map(resp => resp.data),
        tap(data => console.log(`Updated ${kind.typeId}: ${JSON.stringify(data)}`)),
        retryAfter(2, 1000),
        catchError(this.handleError)
      );
  }

  delete<T extends Identifiable> (kind: ResourseType<T>, id: IdType): Observable<T> {
    const collectionPath = this.getCollectionPath(kind.typeId);
    return this.http.delete<RestResponse<T>>(`${this.apiBaseUrl}/${collectionPath}/${id}`)
      .pipe(
        map(resp => resp.data),
        tap(data => console.log(`Deleted ${kind.typeId}: ${JSON.stringify(data)}`)),
        retryAfter(2, 1000),
        catchError(this.handleError)
      );
  }

  getCollectionPath(collectionName): string {
    switch (collectionName) {
      case 'Product': return 'products';
      case 'User': return 'users';
    }
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
