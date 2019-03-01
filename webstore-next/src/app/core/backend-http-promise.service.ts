import { Injectable, Inject, forwardRef } from '@angular/core';
import { Identifiable, ResourseType, IdType } from '../shared/shared-types';
import { environment } from '../../environments/environment';
import { map, tap, catchError, retry } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { retryAfter } from '../shared/rx-operators';
import { throwError } from 'rxjs';

export interface ServiceResponse<T> {
  data: T;
}

@Injectable()
export class BackendHtpPromiseService {
  private static nextId = 1;
  protected apiBaseUrl = `${environment.scheme}://${environment.domain}:${environment.port}/api`;

  constructor(private http: HttpClient) {}

  find<T extends Identifiable> (kind: ResourseType<T>): Promise<T[]> {
    const collectionPath = this.getCollectionPath(kind.typeId);
    return this.http.get<ServiceResponse<T[]>>(`${this.apiBaseUrl}/${collectionPath}`)
      .pipe(
        map(resp => resp.data),
        tap(data => console.log(data)),
        retryAfter(2, 1000),
        catchError(this.handleError)
      ).toPromise();
  }

  add<T extends Identifiable> (kind: ResourseType<T>, entity: T): Promise<T> {
    const collectionPath = this.getCollectionPath(kind.typeId);
    return this.http.post<ServiceResponse<T>>(`${this.apiBaseUrl}/${collectionPath}`, entity)
      .pipe(
        map(resp => resp.data),
        tap(data => console.log(`Successfully created ${kind.typeId}: ${JSON.stringify(data)}`)),
        catchError(this.handleError)
      ).toPromise();
  }

  update<T extends Identifiable> (kind: ResourseType<T>, entity: T): Promise<T> {
    const collectionPath = this.getCollectionPath(kind.typeId);
    return this.http.put<ServiceResponse<T>>(`${this.apiBaseUrl}/${collectionPath}/${entity.id}`, entity)
    .pipe(
      map(resp => resp.data),
      tap(data => console.log(`Successfully updated ${kind.typeId}: ${JSON.stringify(data)}`)),
      retryAfter(2, 1000),
      catchError(this.handleError)
    ).toPromise();
  }

  delete<T extends Identifiable> (kind: ResourseType<T>, id: IdType): Promise<T> {
    const collectionPath = this.getCollectionPath(kind.typeId);
    return this.http.delete<ServiceResponse<T>>(`${this.apiBaseUrl}/${collectionPath}/${id}`)
    .pipe(
      map(resp => resp.data),
      tap(data => console.log(`Successfully updated ${kind.typeId}: ${JSON.stringify(data)}`)),
      retryAfter(2, 1000),
      catchError(this.handleError)
    ).toPromise();
  }

  private getCollectionPath(collectionName): string {
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
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('There was a problem with backend service. Try again later.');
  }

}
