/*
 * Copyright (c) 2015-2018 IPT-Intellectual Products & Technologies (IPT).
 * All rights reserved.
 * 
 * This software provided by IPT-Intellectual Products & Technologies (IPT) is for 
 * non-commercial illustartive and evaluation purposes only. 
 * It is NOT SUITABLE FOR PRODUCTION purposes because it is not finished,
 * and contains security flаws and weaknesses (like sending the passwords and 
 * emails of users to the browser client, wich YOU SHOULD NEVER DO with real user
 * data). You should NEVER USE THIS SOFTWARE with real user data.
 * 
 * This file is licensed under terms of GNU GENERAL PUBLIC LICENSE Version 3
 * (GPL v3). The full text of GPL v3 license is providded in file named LICENSE,
 * residing in the root folder of this repository.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * IPT BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
 * ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import { Injectable, Type } from '@angular/core';
import { LoggerService } from './logger.service';
import { Product } from '../products/product.model';
import { Identifiable, CollectionResponse, IndividualResponse } from '../shared/common-types';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
// tslint:disable-next-line:import-blacklist
// import 'rxjs/Rx';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/do';
import { catchError, map, tap, retry, delay, take, retryWhen, concat } from 'rxjs/operators';
import { COLLECTION_TYPES } from './collection-types';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { Observable } from 'rxjs/Observable';


const API_URL = 'http://localhost:4200/api/';

@Injectable()
export class BackendService {
  constructor(private http: HttpClient, private logger: LoggerService) {}

  findAll<T extends Identifiable> (type: Type<T>): Promise<T[]> {
    if (COLLECTION_TYPES.indexOf(type) < 0) {
      return Promise.reject(`Cannot recognize entity type: ${type.name}`);
    }
    const collection = this.getCollectionName(type);
    this.logger.log(`BackendService called for ${collection}.`);
    const url = API_URL + collection;
    return this.http.get<CollectionResponse<T>>(url)
    .pipe(
      map(productsResponse => productsResponse.data),
      tap(products => this.logger.log(products)),
      catchError(this.handleError),
      retryWhen(errors => errors.pipe(delay(1000), take(5),
        concat(new ErrorObservable('There was a problem with backend service. Try again later.')))),
    ).toPromise();

      // .map(productsResponse => productsResponse['data'])
      // .do(products => this.logger.log(products))
      // .toPromise<T[]>();
  }

  /** POST: add a new item */
  add <T extends Identifiable> (type: Type<T>, item: T): Promise<T> {
    const url = API_URL + this.getCollectionName(type);
    return this.http.post<IndividualResponse<T>>(url, item)
    .pipe(
      map(productsResponse => productsResponse.data),
      catchError(this.handleError)
    ).toPromise();
  }


  private getCollectionName<T extends Identifiable> (type: Type<T>): string {
    return  type.name.toLowerCase() + 's';
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



