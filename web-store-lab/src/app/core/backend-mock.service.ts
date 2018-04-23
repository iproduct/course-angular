import { Injectable, Type } from '@angular/core';
import { Identifiable, IdType } from '../shared/shared-types';
import { PRODUCTS } from './products-mock-data';
import { COLLECTION_TYPES } from './collection-types';
import { BackendPromiseService } from './backend-promise.service';

@Injectable()
export class BackendMockService implements BackendPromiseService {

  constructor() { }

  findAll<T extends Identifiable> (type: Type<T>): Promise<T[]> {
    if (!COLLECTION_TYPES[type.name]) {
      return Promise.reject(`Can not recognise the entity type ${type.name}`);
    }
    let results: T[];
    switch (COLLECTION_TYPES[type.name]) {
      case 'products': results = PRODUCTS as T[]; break;
    }
    return Promise.resolve( results);
  }

  create<T extends Identifiable> (type: Type<T>, item: T): Promise<T> {
    if (!COLLECTION_TYPES[type.name]) {
      return Promise.reject(`Can not recognise the entity type ${type.name}`);
    }
    switch (COLLECTION_TYPES[type.name]) {
      case 'products':
        item.id = Date.now();
        PRODUCTS.push(item);
        break;
    }
    return Promise.resolve(item);
  }

  update<T extends Identifiable> (type: Type<T>, item: T): Promise<T> {
    if (!COLLECTION_TYPES[type.name]) {
      return Promise.reject(`Can not recognise the entity type ${type.name}`);
    }
    switch (COLLECTION_TYPES[type.name]) {
      case 'products':
        const index = PRODUCTS.findIndex(p => p.id === item.id);
        if (index < 0) {
          return Promise.reject(`Item with ${item.id} was not found.`);
        }
        PRODUCTS[index] = item;
        break;
    }
    return Promise.resolve(item);
  }

  remove<T extends Identifiable> (type: Type<T>, id: IdType): Promise<T> {
    if (!COLLECTION_TYPES[type.name]) {
      return Promise.reject(`Can not recognise the entity type ${type.name}`);
    }
    let result: T;
    switch (COLLECTION_TYPES[type.name]) {
      case 'products':
        const index = PRODUCTS.findIndex(p => p.id === id);
        if (index < 0) {
          return Promise.reject(`Item with ${id} was not found.`);
        }
        result = PRODUCTS.splice(index, 1)[0] as T;
        break;
    }
    return Promise.resolve(result);
  }

  // getCollectionName<T extends Identifiable> (type: Type<T>): string {
  //   return type.name.toLocaleLowerCase() + 's';
  // }
}
