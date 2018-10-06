import { Injectable, Type, Inject } from '@angular/core';
import { PRODUCTS } from './mock-data';
import { Identifiable, IdType } from '../shared/shared-types';
import { HttpClient } from '@angular/common/http';
import { BASE_API_URI } from './core.module';
import { API_ENDPOINTS } from './api-endpoints-map';
import { CustomResponse } from './common-types';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BackendPromiseService {
  private static nextId = 1;

  constructor(
    private http: HttpClient,
    @Inject(BASE_API_URI) private uri: string
  ) {
    PRODUCTS.forEach(p => (p.id = BackendPromiseService.nextId++ + ''));
  }

  find<T extends Identifiable>(kind: Type<T>): Promise<T[]> {
    const uri = this.uri + API_ENDPOINTS[kind.name];
    return this.http
      .get<CustomResponse<T[]>>(uri)
      .pipe(map(productResponse => productResponse.data))
      .toPromise();
  }

  add<T extends Identifiable>(kind: Type<T>, entity: T): Promise<T> {
    if (kind.name === 'Product') {
      entity.id = BackendPromiseService.nextId++ + '';
      PRODUCTS.push(entity);
      return Promise.resolve(entity);
    }
  }

  edit<T extends Identifiable>(kind: Type<T>, entity: T): Promise<T> {
    if (kind.name === 'Product') {
      const index = PRODUCTS.findIndex(e => e.id === entity.id);
      PRODUCTS[index] = entity;
      return Promise.resolve(entity);
    }
  }

  remove<T extends Identifiable>(kind: Type<T>, id: IdType): Promise<T> {
    if (kind.name === 'Product') {
      const index = PRODUCTS.findIndex(entity => entity.id === id);
      const removed = PRODUCTS[index];
      PRODUCTS.splice(index, 1);
      return Promise.resolve(removed as T);
    }
  }
}
