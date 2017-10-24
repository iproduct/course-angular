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

import { LoggerService } from './logger.service';
import { Identifiable, API_BASE_URL } from '../shared/shared-types';
import { BackendPromiseService } from './backend-promise.service';
import { ENTITY_TYPES } from '../shared/constants';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class BackendPromiseHttpService implements BackendPromiseService {
  private headers = new Headers({ 'Content-Type': 'application/json' });
  private options = new RequestOptions({ headers: this.headers });

  constructor(
    @Inject(API_BASE_URL) private baseUrl: string,
    private http: HttpClient,
    private logger: LoggerService) { }

  public findAll<T extends Identifiable>(type: Type<T>): Promise<T[]> {
   return this.getCollectionName(type)
      .then(collection =>
         this.http.get<{data: T[]}>(this.baseUrl + '/' + collection)
          .map(response => response.data as T[])
          .do((items: T[]) => this.logger.log(`Fetched ${items ? items.length : 0} ${collection}.`))
          .toPromise<T[]>().catch(this.handleErrorPromise)
      );
  }

  public find<T extends Identifiable>(type: Type<T>, id: string): Promise<T> {
    return this.getCollectionName(type)
      .then(collection =>
         this.http.get<{data: T}>(`${this.baseUrl}/${collection}/${id}`)
          .map(response => response.data as T)
          .do((item: T) => this.logger.log(`Fetched ${item} from ${collection}.`))
          .toPromise<T>().catch(this.handleErrorPromise)
      ).catch(err =>
        Promise.reject(`Cannot find ${type.name} with id: ${id}`)
      );
  }

  public add<T extends Identifiable>(type: Type<T>, item: T): Promise<T> {
     return this.getCollectionName(type)
      .then(collection =>
         this.http.post<T>(`${this.baseUrl}/${collection}`, item/*, this.options*/)
          // .map(response => response.json().data as T)
          .do((created: T) => this.logger.log(`Created ${created} in ${collection}.`))
          .toPromise<T>().catch(this.handleErrorPromise)
      ).catch(err =>
        Promise.reject(`Cannot create ${type.name}. Error: ${err}`)
      );
  }

  public edit<T extends Identifiable>(type: Type<T>, item: T): Promise<T> {
     return this.getCollectionName(type)
      .then(collection =>
         this.http.put<T>(`${this.baseUrl}/${collection}/${item.id}`, item  /*, this.options*/)
          // .map(response => response.json().data as T)
          .do((edited: T) => this.logger.log(`${type.name}:${edited} successfully edited.`))
          .toPromise<T>().catch(this.handleErrorPromise)
      ).catch(err =>
        Promise.reject(`Cannot edit ${type.name}. Error: ${err}`)
      );
  }

  public delete<T extends Identifiable>(type: Type<T>, id: string): Promise<T> {
    return this.getCollectionName(type)
      .then(collection =>
         this.http.delete<T>(`${this.baseUrl}/${collection}/${id}`)
          // .map(response => response.json() as T)
          .do(deleted => this.logger.log(`${type.name} with id:${id} successfully deleted.`))
          .toPromise<T>().catch(this.handleErrorPromise)
      ).catch(err =>
        Promise.reject(`Cannot delete ${type.name} with id:${id}. Error: ${err}`)
      );
  }

  private getCollectionName<T>(type: Type<T>): Promise<string> {
    const collection = type.name.toLowerCase() + 's';
    if ( ENTITY_TYPES.some(et => et.name === type.name) ) {
      return Promise.resolve(collection);
    } else {
      const err = new Error(`Cannot recognize entity type: ${type.name}`);
      return Promise.reject(err);
    }

  }

  // private handleErrorObservable<T>(error: Response | any) {
  //   let errMsg: string;
  //   if (error instanceof Response) {
  //     const body = error.json() || '';
  //     const err = body.error || JSON.stringify(body);
  //     errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
  //   } else {
  //     errMsg = error.message ? error.message : error.toString();
  //   }
  //   // in a real world app, we may send the error to some remote logging infrastructure
  //   console.error(errMsg);
  //   return Observable.throw(errMsg);
  // }

  private handleErrorPromise(error: any) {
    // in a real world app, we may send the error to some remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ||  error.json().error || error.toString();
    }
    console.error( errMsg );
    return Promise.reject(errMsg);
  }
}
