/*
 * Copyright (c) 2015-2017 IPT-Intellectual Products & Technologies (IPT).
 * All rights reserved.
 *
 * This file is licensed under terms of GNU GENERAL PUBLIC LICENSE Version 3
 * (GPL v3). The full text of GPL v3 license is providded in file named LICENSE,
 * residing in the root folder of this project.
 *
 */

import { Injectable, Inject, Type } from '@angular/core';
import { API_BASE_URL } from '../shared/constants';
import { HttpClient } from '@angular/common/http';
import { LoggerService } from './logger.service';
import { BackendPromiseService } from './backend-promise.service';
import { Identifiable, IdentityType, ApplicationError } from '../shared/shared-types';
import { HttpErrorResponse } from '@angular/common/http';
// import 'rxjs/operator/map';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class BackendPromiseHttpService implements BackendPromiseService {

  constructor(
    @Inject(API_BASE_URL) private baseUrl: string,
    private http: HttpClient,
    private logger: LoggerService
  ) { }

  find <T extends Identifiable>(type: Type<T>, id: IdentityType): Promise<T> {
    return this.http.get<T>(this.baseUrl + '/' + this.getCollectionName(type) + '/' + id)
      .catch(error => {
        return Observable.throw(new  ApplicationError<T>(this.getErrorMessage(error), type, id));
      }).toPromise();
  }

  findAll<T extends Identifiable>(type: Type<T>): Promise<T[]> {
    return this.http.get<{ data: T[] }>(this.baseUrl + '/' + this.getCollectionName(type))
      .map( json => json.data)
      .catch(error => {
        return Observable.throw(new  ApplicationError<T>(this.getErrorMessage(error), type));
      }).toPromise();
  }

  add<T extends Identifiable>(type: Type<T>, item: T): Promise<T> {
    return this.http.post<T>(this.baseUrl + '/' + this.getCollectionName(type), item)
    .catch(error => {
      return Observable.throw(new  ApplicationError<T>(this.getErrorMessage(error), type, item.id, item));
    }).toPromise();
  }
  edit<T extends Identifiable>(type: Type<T>, item: T): Promise<T> {
    return this.http.put<T>(this.baseUrl + '/' + this.getCollectionName(type) + '/' + item.id, item)
    .catch(error => {
      return Observable.throw(new  ApplicationError<T>(this.getErrorMessage(error), type, item.id, item));
    }).toPromise();
  }
  delete<T extends Identifiable>(type: Type<T>, id: IdentityType): Promise<T> {
    return this.http.delete<T>(this.baseUrl + '/' + this.getCollectionName(type) + '/' + id)
    .catch(error => {
      return Observable.throw(new  ApplicationError<T>(this.getErrorMessage(error), type, id));
    }).toPromise();
}

  private getCollectionName<T>(type: Type<T>) {
    return type.name + 's';
  }

  private getErrorMessage(error: HttpErrorResponse) {
    if (error.error instanceof Error) {
      // An Angular HHTP client or network error occurred. Handle it accordingly.
      return error.error.message;
    } else {
      // The server backend returned an unsuccessful response code.
      return `Backend returned code ${error.status}: ${error.statusText}, body was: ${error.error}`;
    }
  }

}

