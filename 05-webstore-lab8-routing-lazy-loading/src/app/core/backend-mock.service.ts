import { Injectable } from '@angular/core';
import { PRODUCTS } from '../products/products-mock-data';
import { Identifiable, ResourceType, IdType } from '../shared/shared-types';

@Injectable({
  providedIn: 'root'
})
export class BackendMockService {
  private static nextId = 0;
  private products = PRODUCTS;

  constructor() {
    this.products.forEach( p => p.id = ++BackendMockService.nextId + '');
  }

  find<T extends Identifiable>(kind: ResourceType<T>) {
    const collection = this.getCollection(kind.typeId);
    return Promise.resolve(collection as T[]);
  }

  add<T extends Identifiable>(kind: ResourceType<T>, entity: T) {
    entity.id = ++BackendMockService.nextId + '';
    const collection = this.getCollection(kind.typeId);
    collection.push(entity);
    return Promise.resolve(entity as T);
  }

  update<T extends Identifiable>(kind: ResourceType<T>, entity: T) {
    const collection = this.getCollection(kind.typeId);
    const index = collection.findIndex(e => e.id === entity.id);
    if (index < 0) {
      return Promise.reject(`Error: Invalid ${kind.typeId} ID=${entity.id}`);
    }
    collection[index] = entity;
    return Promise.resolve(entity as T);
  }

  delete<T extends Identifiable>(kind: ResourceType<T>, entityId: IdType) {
    const collection = this.getCollection(kind.typeId);
    const index = collection.findIndex(e => e.id === entityId);
    if (index < 0) {
      return Promise.reject(`Error: Invalid ${kind.typeId} ID=${entityId}`);
    }
    const entity = collection.splice(index, 1)[0];
    return Promise.resolve(entity as T);
  }

  getCollection(collectionName: string): Identifiable[] {
    switch (collectionName) {
      case 'Product': return this.products; break;
      // case 'User': return this.users; break;
    }
  }

}
