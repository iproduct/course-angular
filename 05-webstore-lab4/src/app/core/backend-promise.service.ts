import { Injectable, Type, Inject } from '@angular/core';
import { PRODUCTS } from './mock-data';
import { Identifiable, IdType } from '../shared/shared-types';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BASE_API_URI } from './core.module';
import { API_ENDPOINTS } from './api-endpoints-map';
import { CustomResponse } from './common-types';
import { map, tap, catchError } from 'rxjs/operators';
import { LoggerService } from './logger.service';
import { throwError } from 'rxjs';
import { retryAfter } from '../shared/rx-operators';

@Injectable({
  providedIn: 'root'
})
export class BackendPromiseService {
  private static nextId = 1;

  constructor(
    private http: HttpClient,
    @Inject(BASE_API_URI) private uri: string,
    private logger: LoggerService
  ) {
    PRODUCTS.forEach(p => (p.id = BackendPromiseService.nextId++ + ''));
  }

  find<T extends Identifiable>(kind: Type<T>): Promise<T[]> {
    const uri = this.uri + API_ENDPOINTS[kind.name];
    return this.http
      .get<CustomResponse<T[]>>(uri)
      .pipe(
        map(productResponse => productResponse.data),
        tap(entities => this.logger.log(`Entities: ${JSON.stringify(entities)}.`)),
        retryAfter(3, 1000),
        catchError(this.handleError),
      )
      .toPromise();
  }

  add<T extends Identifiable>(kind: Type<T>, entity: T): Promise<T> {
    if (kind.name === 'Product') {
      entity.id = BackendPromiseService.nextId++ + '';
      PRODUCTS.push(entity);
      return Promise.resolve(entity);
    }
  }

  edit<T extends Identifiable>(kind: Type<T>, entity: T): Promise<T> {
    if (kind.name === 'Product') {
      const index = PRODUCTS.findIndex(e => e.id === entity.id);
      PRODUCTS[index] = entity;
      return Promise.resolve(entity);
    }
  }

  remove<T extends Identifiable>(kind: Type<T>, id: IdType): Promise<T> {
    if (kind.name === 'Product') {
      const index = PRODUCTS.findIndex(entity => entity.id === id);
      const removed = PRODUCTS[index];
      PRODUCTS.splice(index, 1);
      return Promise.resolve(removed as T);
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
