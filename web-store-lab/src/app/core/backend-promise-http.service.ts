import { catchError, map, tap } from 'rxjs/operators';
import { Injectable, Type } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoggerService } from './logger.service';
import { Identifiable, CollectionResponse } from '../shared/shared-types';
import { COLLECTION_TYPES } from './collection-types';
import { BackendPromiseService } from './backend-promise.service';
const API_URL = 'http://localhost:4200/api/';

@Injectable()
export class BackendPromiseHttpService implements BackendPromiseService {
  constructor(private http: HttpClient, private logger: LoggerService) {}

  findAll<T extends Identifiable> (type: Type<T>): Promise<T[]> {
    const url = API_URL +  COLLECTION_TYPES[type.name];
    return this.http.get<CollectionResponse<T>>(url)
    .pipe(
      map(productsResponse => productsResponse.data),
      tap(products => this.logger.log(products))
    ).toPromise<T[]>();
  }
  create<T extends Identifiable>(type: Type<T>, item: T): Promise<T> {
    throw new Error('Method not implemented.');
  }
  update<T extends Identifiable>(type: Type<T>, item: T): Promise<T> {
    throw new Error('Method not implemented.');
  }
  remove<T extends Identifiable>(type: Type<T>, id: number): Promise<T> {
    throw new Error('Method not implemented.');
  }
}

