import { Injectable, Type } from '@angular/core';
import { LoggerService } from './logger.service';
import { Product } from '../products/product.model';
import { PRODUCTS, COLLECTION_TYPES } from './products-mock-data';
import { Identifiable } from '../shared/common-types';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// tslint:disable-next-line:import-blacklist
// import 'rxjs/Rx';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/do';
import { catchError, map, tap } from 'rxjs/operators';


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
    return this.http.get<T[]>(url)
    .pipe(
      map(productsResponse => productsResponse['data']),
      tap(products => this.logger.log(products))
    ).toPromise<T[]>();

      // .map(productsResponse => productsResponse['data'])
      // .do(products => this.logger.log(products))
      // .toPromise<T[]>();
  }

  private getCollectionName<T extends Identifiable> (type: Type<T>): string {
    return  type.name.toLowerCase() + 's';
  }

}



