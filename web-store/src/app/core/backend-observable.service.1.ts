import { Injectable, Type } from '@angular/core';
import { LoggerService } from './logger.service';
import { Product } from '../products/product.model';
import { Identifiable, CollectionResponse, IndividualResponse } from '../shared/common-types';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
// tslint:disable-next-line:import-blacklist
// import 'rxjs/Rx';
// import 'rxjs/add/operator/flatMap';
// import 'rxjs/add/operator/do';
import { catchError, map, tap, retry, delay, take, retryWhen, concat, flatMap } from 'rxjs/operators';
import { COLLECTION_TYPES } from './collection-types';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { Observable } from 'rxjs/Observable';
import { BackendService } from './backend.service';


const API_URL = 'http://localhost:4200/api/';

@Injectable()
export class BackendObservableService implements BackendService{
  constructor(private http: HttpClient, private logger: LoggerService) {}

  findAll<T extends Identifiable> (type: Type<T>): Observable<T[]> {
    return this.getCollectionName(type).pipe(
      flatMap(collection =>
        this.http.get<CollectionResponse<T>>(API_URL + collection)
        .pipe(
          map(productsResponse => productsResponse.data),
          tap(products => this.logger.log(products)),
          catchError(this.handleError),
          retryWhen(errors => errors.pipe(delay(1000), take(5),
            concat(new ErrorObservable('There was a problem with backend service. Try again later.')))),
        )
      )
    );
  }

  /** POST: add a new item */
  add <T extends Identifiable> (type: Type<T>, item: T): Observable<T> {
    return this.getCollectionName(type).pipe(
      flatMap(collection =>
        this.http.post<IndividualResponse<T>>(API_URL + collection, item)
        .pipe(
          map(productsResponse => productsResponse.data),
          catchError(this.handleError)
        )
      )
    );
  }


  private getCollectionName<T extends Identifiable> (type: Type<T>): Observable<string> {
    if (COLLECTION_TYPES.indexOf(type) < 0) {
      return new ErrorObservable(`Cannot recognize entity type: ${type.name}`);
    }
    const collection = type.name.toLowerCase() + 's';
    this.logger.log(`BackendService called for ${collection}.`);
    return new Observable(obs => { obs.next(collection); }) ;
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
    return new ErrorObservable('There was a problem with backend service. Try again later.');
  }


}



