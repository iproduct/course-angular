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
import { Identifiable, IdentityType, ApplicationError } from '../shared/shared-types';
import { HttpErrorResponse } from '@angular/common/http';
import { BackendService } from './backend.service';
import { catchError, tap, startWith, switchMap, map } from 'rxjs/operators';
// tslint:disable-next-line:import-blacklist
import { throwError, Subject, Observable } from 'rxjs';


@Injectable()
export class BackendHttpService implements BackendService {
  private refreshes = new Subject<void>();

  constructor(
    @Inject(API_BASE_URL) private baseUrl: string,
    private http: HttpClient,
    private logger: LoggerService
  ) { }

  find <T extends Identifiable>(type: Type<T>, id: IdentityType): Observable<T> {
    return this.http.get<{data: T}>(this.baseUrl + '/' + this.getCollectionName(type) + '/' + id)
      .pipe(
        map( json => json.data ),
        catchError(error => {
        return throwError(new  ApplicationError<T>(this.getErrorMessage(error), type, id));
      }));
  }

  findAll<T extends Identifiable>(type: Type<T>): Observable<T[]> {
    return this.http.get<{ data: T[] }>(this.baseUrl + '/' + this.getCollectionName(type))
      .pipe(
        map( json => json.data ),
        catchError(error => {
          return throwError(new  ApplicationError<T>(this.getErrorMessage(error), type));
        })
      );
  }

  findAllWithRefresh<T extends Identifiable>(type: Type<T>): Observable<T[]> {
    return this.refreshes.pipe(
      startWith(null),
      switchMap(() => this.findAll(type))
    );
  }

  refresh<T extends Identifiable>(type: Type<T>): void {
    this.refreshes.next();
  }

  add<T extends Identifiable>(type: Type<T>, item: T): Observable<T> {
    return this.http.post<T>(this.baseUrl + '/' + this.getCollectionName(type), item)
    .pipe(
      tap(user => this.refresh(type)),
      catchError(error => {
        return Observable.throw(new  ApplicationError<T>(this.getErrorMessage(error), type, item.id, item));
      })
    );
  }
  edit<T extends Identifiable>(type: Type<T>, item: T): Observable<T> {
    return this.http.put<T>(this.baseUrl + '/' + this.getCollectionName(type) + '/' + item.id, item)
    .pipe(
      tap(user => this.refresh(type)),
      catchError(error => {
        return Observable.throw(new  ApplicationError<T>(this.getErrorMessage(error), type, item.id, item));
    }));
  }
  delete<T extends Identifiable>(type: Type<T>, id: IdentityType): Observable<T> {
    return this.http.delete<T>(this.baseUrl + '/' + this.getCollectionName(type) + '/' + id)
    .pipe(
      tap(user => this.refresh(type)),
      catchError(error => {
        return Observable.throw(new  ApplicationError<T>(this.getErrorMessage(error), type, id));
      })
    );
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

