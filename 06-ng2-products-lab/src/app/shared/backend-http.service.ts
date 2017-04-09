import { Injectable, Inject, Type } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { Logger } from './logger.service';
import { User } from '../users/user.model';
import { Identifiable } from './common.interfaces';
import { BackendService } from './backend.service';
import { Product } from '../products/product.model';

@Injectable()
export class BackendHttpService implements BackendService {
  private headers = new Headers({ 'Content-Type': 'application/json' });
  private options = new RequestOptions({ headers: this.headers });

  constructor(
    @Inject('API_BASE_URL') private baseUrl: string,
    private http: Http,
    private logger: Logger) { }

  public findAll<T extends Identifiable>(type: Type<T>): Promise<T[]> {
    let collection = type.name.toLowerCase() + 's';
    if (type.name !== Product.name && type.name !== User.name) {
      let err = new Error(`Cannot recognize entity type: ${type.name}`);
      return Promise.reject<T[]>(err);
    }
    return this.http.get(this.baseUrl + '/' + collection)
      .map(response => response.json().data as T[])
      .do((items: T[]) => this.logger.log(`Fetched ${items.length} ${collection}.`))
      .catch(this.handleErrorObservable)
      .toPromise();
  }

  public find<T extends Identifiable>(type: Type<T>, id: number): Promise<T> {
    return this.findAll<T>(type).then(
      items => items.filter(item => item.id === id)[0]
    ).catch(err => {
      throw new Error(`Cannot find object of type: ${type.name} with id: ${id}`);
    });
  }

  public add<T extends Identifiable>(type: Type<T>, item: T): Promise<T> {
    let collection = type.name.toLowerCase() + 's';
    if (type.name !== Product.name && type.name !== User.name) {
      let err = new Error(`Cannot recognize entity type: ${type.name}`);
      return Promise.reject<T>(err);
    }
    return this.http.post(this.baseUrl + '/' + collection, JSON.stringify(item), this.options)
      .toPromise()
      .then(res => res.json().data)
      .then(itemData => {
        // this.findAll(type); // refresh collection asyncronously
        return itemData;
      }).catch(this.handleErrorPromise);
  }

  public edit<T extends Identifiable>(type: Type<T>, item: T): Promise<T> {
    let collection = type.name.toLowerCase() + 's';
    if (type.name !== Product.name && type.name !== User.name) {
      let err = new Error(`Cannot recognize entity type: ${type.name}`);
      return Promise.reject<T>(err);
    }
    return this.http.put(this.baseUrl + '/' + collection + '/' + item.id, JSON.stringify(item), this.options)
      .toPromise()
      .then(() => {
        // this.findAll(type); // refresh collection asyncronously
        return item;
      }).catch(this.handleErrorPromise);
  }

  public delete<T extends Identifiable>(type: Type<T>, itemId: number): Promise<void> {
    let collection = type.name.toLowerCase() + 's';
    if (type.name !== Product.name && type.name !== User.name) {
      let err = new Error(`Cannot recognize entity type: ${type.name}`);
      return Promise.reject<void>(err);
    }
    return this.http.delete(this.baseUrl + '/' + collection + '/' + itemId)
      .toPromise()
      .then(response => {
        // this.findAll(type); // refresh collection asyncronously
        return;
      }).catch(this.handleErrorPromise);
  }

  private handleErrorObservable(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    // in a real world app, we may send the error to some remote logging infrastructure
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

  private handleErrorPromise(error: any) {
    // in a real world app, we may send the error to some remote logging infrastructure
    console.error(error);
    return Promise.reject(error.message || error.json().error || 'Server error');
  }


}
