import { Injectable, Type } from '@angular/core';
import { PRODUCTS } from './mock-data';
import { Identifiable, IdType } from '../shared/shared-types';

@Injectable({
  providedIn: 'root'
})
export class BackendMockService {
  private static nextId = 1;

  constructor() { }

  find<T extends Identifiable>(kind: Type<T>): Promise<T[]> {
    if (kind.name === 'Product') {
      return Promise.resolve(PRODUCTS as T[]);
    }
  }

  add<T extends Identifiable>(kind: Type<T>, entity: T): Promise<T> {
    if (kind.name === 'Product') {
      entity.id = BackendMockService.nextId++ + '';
      PRODUCTS.push(entity);
      return Promise.resolve(entity as T);
    }
  }

  remove<T extends Identifiable>(kind: Type<T>, id: IdType): T[] {
    if (kind.name === 'Product') {
      return PRODUCTS as T[];
    }
  }
}
