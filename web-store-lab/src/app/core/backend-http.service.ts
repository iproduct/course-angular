import {HttpErrorResponse} from '@angular/common/http';
import { catchError, map, tap, retryWhen, concat, delay, take, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { Injectable, Type } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoggerService } from './logger.service';
import { Identifiable, CollectionResponse, IndividualResponse, IdType } from '../shared/shared-types';
import { COLLECTION_TYPES } from './collection-types';
import { BackendService } from './backend.service';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { ArrayObservable } from 'rxjs/observable/ArrayObservable';
const API_URL = 'http://localhost:4200/api/';


@Injectable()
export class BackendHttpService implements BackendService {
  constructor(private http: HttpClient, private logger: LoggerService) {}

  findAll<T extends Identifiable> (type: Type<T>): Observable<T[]> {
    const url = API_URL +  COLLECTION_TYPES[type.name];
    return this.http.get<CollectionResponse<T>>(url)
    .pipe(
      map(productsResponse => productsResponse.data),
      tap(products => this.logger.log(products)),
      catchError(this.handleError),
      retryWhen(err => err.pipe(delay(1000), take(3),
        concat(new ErrorObservable('Error performing the operation. Correct data and try again.'))))
    );
  }

 /** GET: find an item by id*/
 find <T extends Identifiable> (type: Type<T>, id: KeyType): Observable<T> {
  return ArrayObservable.of(COLLECTION_TYPES[type.name]).pipe(
    switchMap(collection =>
      this.http.get<IndividualResponse<T>>(`${API_URL}${collection}/${id}`)
      .pipe(
        map(productsResponse => productsResponse.data),
        catchError(this.handleError)
      )
    )
  );
}



/** POST: add a new item */
create <T extends Identifiable> (type: Type<T>, item: T): Observable<T> {
  return ArrayObservable.of(COLLECTION_TYPES[type.name]).pipe(
    switchMap(collection =>
      this.http.post<IndividualResponse<T>>(API_URL + collection, item)
      .pipe(
        map(productsResponse => productsResponse.data),
        catchError(this.handleError)
      )
    )
  );
}

/** PUT: update an item */
update <T extends Identifiable> (type: Type<T>, item: T): Observable<T> {
  return ArrayObservable.of(COLLECTION_TYPES[type.name]).pipe(
    switchMap(collection =>
      this.http.put<IndividualResponse<T>>(`${API_URL}${collection}/${item.id}`, item)
      .pipe(
        map(productsResponse => productsResponse.data),
        catchError(this.handleError)
      )
    )
  );
}

/** DELETE: remove an item */
remove <T extends Identifiable> (type: Type<T>, id: IdType): Observable<T> {
  return ArrayObservable.of(COLLECTION_TYPES[type.name]).pipe(
    switchMap(collection =>
      this.http.delete<IndividualResponse<T>>(`${API_URL}${collection}/${id}`)
      .pipe(
        map(productsResponse => productsResponse.data),
        catchError(this.handleError)
      )
    )
  );
}

  private handleError(error: HttpErrorResponse) {
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
    return new ErrorObservable('Error performing the operation. Correct data and try again.');
  }
}

