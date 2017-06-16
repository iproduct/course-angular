/*
 * Copyright (c) 2015-2017 IPT-Intellectual Products & Technologies (IPT).
 * All rights reserved.
 *
 * This file is licensed under terms of GNU GENERAL PUBLIC LICENSE Version 3
 * (GPL v3). The full text of GPL v3 license is providded in file named LICENSE,
 * residing in the root folder of this project.
 *
 */

import { Injectable, Inject, Type, InjectionToken, Injector } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { Logger } from './logger.service';
import { Identifiable, IdentityType, API_BASE_URL } from '../shared/shared-types';
import { BackendService } from './backend.service';
import { ENTITY_TYPES } from '../constants';

@Injectable()
export class BackendHttpService implements BackendService {
  private headers = new Headers({ 'Content-Type': 'application/json' });
  private options = new RequestOptions({ headers: this.headers });

  constructor(
    @Inject(API_BASE_URL) private baseUrl: string,
    private http: Http,
    private logger: Logger) {}

  public findAll<T extends Identifiable>(type: Type<T>): Observable<T[]> {
    return this.getCollectionName(type)
      .switchMap(collection =>
        this.http.get(this.baseUrl + '/' + collection)
          .map(response => response.json().data as T[])
          .do((items: T[]) => this.logger.log(`Fetched ${items ? items.length : 0} ${collection}.`))
          .catch(this.handleErrorObservable)
      );
  }

  public find<T extends Identifiable>(type: Type<T>, id: IdentityType): Observable<T> {
    return this.getCollectionName(type)
      .switchMap(collection =>
        this.http.get(`${this.baseUrl}/${collection}/${id}`)
          .map(response => response.json() as T)
          .do((item: T) => this.logger.log(`Fetched ${item} from ${collection}.`))
          .catch(response => (response.status && response.status === 404) ?
            Observable.throw(`Cannot find ${type.name} with id: ${id}`) : response
          ).catch(this.handleErrorObservable)
      )
  }

  public add<T extends Identifiable>(type: Type<T>, item: T): Observable<T> {
    return this.getCollectionName(type)
      .switchMap(collection =>
        this.http.post(`${this.baseUrl}/${collection}`, JSON.stringify(item), this.options)
          .map(response => response.json() as T)
          .do((created: T) => this.logger.log(`Created ${created} in ${collection}.`))
          .catch(this.handleErrorObservable)
          .catch(err => Observable.throw(`Cannot create ${type.name}. Error: ${err}`))
      );
  }

  public edit<T extends Identifiable>(type: Type<T>, item: T): Observable<T> {
    return this.getCollectionName(type)
      .switchMap(collection =>
        this.http.put(`${this.baseUrl}/${collection}/${item.id}`, JSON.stringify(item), this.options)
          .map(response => response.json() as T)
          .do((edited: T) => this.logger.log(`${type.name} with ID:${edited.id} successfully edited.`))
          .catch(this.handleErrorObservable)
          .catch(err => Observable.throw(`Cannot edit ${type.name}. Error: ${err}`))
      );
  }

  public delete<T extends Identifiable>(type: Type<T>, id: IdentityType): Observable<T> {
    return this.getCollectionName(type)
      .flatMap(collection => {
        console.log(collection);
        return this.http.delete(`${this.baseUrl}/${collection}/${id}`)
          .map(response => response.json() as T)
          .do(deleted => this.logger.log(`${type.name} with id:${deleted.id} successfully deleted.`))
          .catch(this.handleErrorObservable)
          .catch(err => Observable.throw(`Cannot delete ${type.name} with id:${id}. Error: ${err}`))
      });
  }

  private getCollectionName<T>(type: Type<T>): Observable<string> {
    const collection = type.name.toLowerCase() + 's';
    if (ENTITY_TYPES.some(et => et.name === type.name)) {
      return Observable.of(collection);
    } else {
      const err = new Error(`Cannot recognize entity type: ${type.name}`);
      return Observable.throw(err);
    }
  }

  private handleErrorObservable<T>(error: Response | any): Observable<T> {
    // in a real world app, we may send the error to some remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message || error.json().error || error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

  // private handleErrorPromise(error: any) {
  //   // in a real world app, we may send the error to some remote logging infrastructure
  //   let errMsg: string;
  //   if (error instanceof Response) {
  //     const body = error.json() || '';
  //     const err = body.error || JSON.stringify(body);
  //     errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
  //   } else {
  //     errMsg = error.message ||  error.json().error || error.toString();
  //   }
  //   console.error( errMsg );
  //   return Promise.reject(errMsg);
  // }
}
