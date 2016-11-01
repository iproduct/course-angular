import { Injectable, Inject, Type } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Logger } from './logger.service';
import { Product } from '../products/product.model';
import { User, Customer, Admin, Operator } from '../users/user.model';
import { Gender } from './../users/user.model';
import { Identifiable } from './common.interfaces';
import { BackendService } from './backend.service';
import { API_BASE_URL } from './common.module';

const PRODUCTS: Identifiable[] = [
  new Product(1, 'Logitech Mouse', 12.99, 'Super mouse'),
  new Product(2, 'Wirelesss Keyboard', 23.85, 'Type wherever you are!'),
  new Product(3, 'Whiteboard Marker', 0.32, 'Drawing is fun!')
];

const USERS: Identifiable[] = [
  new Customer(1, 'John', 'Smith', Gender.MALE, 'john@abv.bg', 'john'),
  new Customer(2, 'Sara', 'Smith', Gender.FEMALE, 'sara@abv.bg', 'sara'),
  new Operator(3, 'Veronica', 'Simpson', Gender.FEMALE, 'vera@yahoo.com', 'vera'),
  new Operator(4, 'Simon', 'Stars', Gender.MALE, 'simon@yahoo.com', 'simon'),
  new Admin(5, 'Brian', 'Harisson', Gender.MALE, 'brian@gmail.com', 'brian'),
  new Admin(6, 'Svetlana', 'Borisova', Gender.FEMALE, 'sveta@gmail.com', 'sveta')
];

export const DEFAULT_MIN_FRESH = 30000; // Minimal freshness of chached data acceptable in mills

class CacheItem {
  constructor(public value: any, public lastFetched: number) { }
}

interface CacheData {
  [key: string]: CacheItem;
}

class Cache {
  public data: CacheData = {};

  constructor(public minFreshTreshodld: number = DEFAULT_MIN_FRESH) { }

  public set(key: string, value: any): void {
    this.data[key] = new CacheItem(value, Date.now());
  }
  public get(key: string) {
    return this.data[key].value;
  }
  public getLastFetched(key: string): number {
    return this.data[key].lastFetched;
  }
  public isFresh(key: string): boolean {
    return this.data[key] && this.data[key].lastFetched
      && Date.now() - this.data[key].lastFetched < this.minFreshTreshodld;
  }
  public invalidate(key: string): void {
    this.data[key].lastFetched = 0;
  }

}

@Injectable()
export class BackendHttpService implements BackendService {
  private apiBaseUrl: string;
  private cache = new Cache();
  private headers = new Headers({'Content-Type': 'application/json'});
  private options = new RequestOptions({ headers: this.headers });

  constructor( @Inject('API_BASE_URL') apiBaseUrl: string, private http: Http, private logger: Logger) {
    this.apiBaseUrl = apiBaseUrl;
  }

  public findAll<T extends Identifiable>(type: Type<T>, reloadCache?: boolean): Promise<T[]> {
    let apiUrl = this.apiBaseUrl;
    let collection: string;
    switch (type.name) {
      case Product.name:
        apiUrl += '/products';
        collection = 'products';
        break;
      case User.name:
        apiUrl += '/users';
        collection = 'users';
        break;
      default:
        let err = new Error(`Cannot recognize entity type: ${type.name}`);
        return Promise.reject<T[]>(err);
    }
    if (!reloadCache && this.cache.isFresh(collection)) { // try to get data from chache if fresh return the Promise
      this.logger.log(`Getting ${collection} data from chache.`);
      return Promise.resolve(this.cache.get(collection));
    } else { // call the HTTP API and return the Promise
      return this.http.get(apiUrl)
        .map(response => response.json().data || {} as T[])
        .do( data => this.cache.set(collection, data) )
        .catch(this.handleErrorObservable)
        .toPromise();
    }
  }

  public find<T extends Identifiable>(type: Type<T>, id: number, reloadCache?: boolean): Promise<T> {
    return this.findAll<T>(type, reloadCache).then(
      items => items.filter(item => item.id === id)[0]
    ).catch(err => {
      throw new Error(`Cannot find object of type: ${type.name} with id: ${id}`);
    });
  }

  public add<T extends Identifiable>(type: Type<T>, item: T): Promise<T> {
    let apiUrl = this.apiBaseUrl;
    let collection: string;
    switch (type.name) {
      case Product.name:
        apiUrl += '/products';
        collection = 'products';
        break;
      case User.name:
        apiUrl += '/users';
        collection = 'users';
        break;
      default:
        let err = new Error(`Cannot recognize entity type: ${type.name}`);
        return Promise.reject<T>(err);
    }
    return this.http.post(apiUrl, JSON.stringify(item), this.options)
          .toPromise()
          .then(res => res.json().data)
          .then(itemData => {
            this.cache.get(collection).push(itemData);
            this.findAll(type, true); // refresh collection asyncronously
            return itemData;
          }).catch(this.handleErrorPromise);
  }

  public edit<T extends Identifiable>(type: Type<T>, item: T): Promise<T> {
    let isSuccessful = false;
    let err = new Error(`${type.name} with ID:${item.id} does not exist: ${JSON.stringify(item)}.`);
    switch (type.name) {
      case Product.name:
        isSuccessful = this.mergeItem(PRODUCTS, item);
        break;
      case User.name:
        isSuccessful = this.mergeItem(USERS, item);
        break;
      default:
        err = new Error(`Cannot recognize entity type: ${type.name}`);
    }
    return isSuccessful ? Promise.resolve(item) : Promise.reject<T>(err);
  }

  public delete<T extends Identifiable>(type: Type<T>, itemId: number): Promise<T> {
    let deleted: T | undefined = undefined;
    let err = new Error(`${type.name} with ID:${itemId} does not exist.`);
    switch (type.name) {
      case Product.name:
        deleted = this.deleteItem(<T[]> PRODUCTS, itemId);
        break;
      case User.name:
        deleted = this.deleteItem(<T[]> USERS, itemId);
        break;
      default:
        err = new Error(`Cannot recognize entity type: ${type.name}`);
    }
    return deleted ? Promise.resolve(deleted) : Promise.reject<T>(err);
  }

  private getNextId(collection: Identifiable[]): number {
    return collection.reduce((prevMaxId, next) =>
      next.id > prevMaxId ? next.id : prevMaxId, 0) + 1;
  }

  private mergeItem(collection: Identifiable[], item: Identifiable): boolean {
    for (let i = 0; i < collection.length; i++) {
      if (collection[i].id === item.id) {
        Object.assign(collection[i], item);
        return true;
      }
    }
    return false;
  }

  private deleteItem<T extends Identifiable>(collection: T[], id: number): T | undefined {
    for (let i = 0; i < collection.length; i++) {
      if (collection[i].id === id) {
        return collection.splice(i, 1)[0]; // delete the current element and return deleted
      }
    }
    return undefined;
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
    this.logger.error(errMsg);
    return Observable.throw(errMsg);
  }

  private handleErrorPromise(error: any) {
    // in a real world app, we may send the error to some remote logging infrastructure
    console.error(error);
    return Promise.reject(error.message || error.json().error || 'Server error');
  }

}
