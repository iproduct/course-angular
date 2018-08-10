import { Injectable, Type, Inject } from '@angular/core';
import { BackendService } from './backend.service';
import { Observable } from 'rxjs';
import { Identifiable, CollectionResponse, KeyType, IndividualResponse } from '../shared/common-types';
import { COLLECTION_ENDOINTS } from './collection-types';
import { LoggerService } from './logger.service';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
// tslint:disable-next-line:import-blacklist
// import 'rxjs/Rx';
// import 'rxjs/add/operator/flatMap';
// import 'rxjs/add/operator/do';
import { catchError, map, tap, retry, delay, take, retryWhen, concat, switchMap } from 'rxjs/operators';
import { of, throwError } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BackendHttpService implements BackendService {

  constructor(
    @Inject('API_URL') private apiUrl: string,
    private http: HttpClient,
    private logger: LoggerService
  ) { }

  /** GET: find all item */
  findAll<T extends Identifiable>(type: Type<T>): Observable<T[]> {
    const url = `${this.apiUrl}/${COLLECTION_ENDOINTS[type.name]}`;
    return this.http.get<CollectionResponse<T>>(url).pipe(
      map( response => response.data),
      tap(products => this.logger.log(products)),
      catchError(this.handleError('finding all items')),
      retryWhen(errors => errors.pipe(delay(1000), take(3),
        concat(throwError(`Error performing find all items. Correct data and try again.`)))
      )
    );
  }

  /** GET: find an item by id*/
  find <T extends Identifiable> (type: Type<T>, id: KeyType): Observable<T> {
    const url = `${this.apiUrl}/${COLLECTION_ENDOINTS[type.name]}/${id}`;
    return this.http.get<IndividualResponse<T>>(url)
      .pipe(
        map(productsResponse => productsResponse.data),
        catchError(this.handleError('find item by id'))
      );
  }



  /** POST: add a new item */
  create <T extends Identifiable> (type: Type<T>, item: T): Observable<T> {
    const url = `${this.apiUrl}/${COLLECTION_ENDOINTS[type.name]}`;
    return this.http.post<IndividualResponse<T>>(url, item)
        .pipe(
          map(productsResponse => productsResponse.data),
          catchError(this.handleError('creating item'))
        );
  }

  /** PUT: update an item */
  update <T extends Identifiable> (type: Type<T>, item: T): Observable<T> {
    const url = `${this.apiUrl}/${COLLECTION_ENDOINTS[type.name]}/${item.id}`;
    return this.http.put<IndividualResponse<T>>(url, item)
        .pipe(
          map(productsResponse => productsResponse.data),
          catchError(this.handleError('update item'))
        );
  }

  /** DELETE: remove an item */
  remove <T extends Identifiable> (type: Type<T>, id: KeyType): Observable<T> {
    const url = `${this.apiUrl}/${COLLECTION_ENDOINTS[type.name]}/${id}`;
    return this.http.delete<IndividualResponse<T>>(url)
        .pipe(
          map(productsResponse => productsResponse.data),
          catchError(this.handleError('delete item'))
        );
  }

  private handleError(operation = '') {
    return (error: HttpErrorResponse) => { 
      if (error.error instanceof ErrorEvent) {
        // Client-side or network error
        console.error('Client-side error:', error.error.message);
      } else {
        // Backend unsuccessful status code.
        console.error(
          `Backend returned code ${error.status}, ` +
          `body was: ${JSON.stringify(error.error)},
          message was: ${JSON.stringify(error.message)}`);
      }
      // return ErrorObservable with a user-facing error message
      return throwError(`Error performing ${operation} operation. Correct data and try again.`);
    }
  }


}