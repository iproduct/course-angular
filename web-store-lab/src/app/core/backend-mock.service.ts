import { Injectable, Type } from '@angular/core';
import { Identifiable, IdType } from '../shared/shared-types';
import { PRODUCTS } from './products-mock-data';
import { COLLECTION_TYPES } from './collection-types';

@Injectable()
export class BackendMockService {

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

  remove<T extends Identifiable> (type: Type<T>, id: IdType): Promise<T> {
    if (!COLLECTION_TYPES[type.name]) {
      return Promise.reject(`Can not recognise the entity type ${type.name}`);
    }
    let result: T;
    switch (COLLECTION_TYPES[type.name]) {
      case 'products':
        index = PRODUCTS.findIndex(p => p.id === id);
        if(index < 0) return nu
      result =
        PRODUCTS.splice(, 1)[0] as T;
        break;
    }
    return Promise.resolve( result);
  }

  // getCollectionName<T extends Identifiable> (type: Type<T>): string {
  //   return type.name.toLocaleLowerCase() + 's';
  // }
}
