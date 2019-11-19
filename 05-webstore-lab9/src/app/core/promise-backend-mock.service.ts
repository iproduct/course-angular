import { Injectable } from '@angular/core';
import { PromiseBackendService } from './promise-backend.service';
import { Identifiable, IdType, ResourceType } from '../shared/common-types';
import { Product } from '../products/product.model';
import { PRODUCTS } from '../products/mock-products';

@Injectable({
  providedIn: 'root'
})
export class PromiseBackendMockService implements PromiseBackendService {
  private static nextId = 0;
  private entityMap = new Map<string, Identifiable[]>();

  constructor() {
    this.entityMap.set(Product.typeId, PRODUCTS);
    this.entityMap.get(Product.typeId)
      .forEach(entity => entity.id = this.getNextId());
  }

  findAll<T extends Identifiable>(kind: ResourceType<T>): Promise<T[]> {
    return Promise.resolve([...this.entityMap.get(kind.typeId)] as T[]);
  }
  findById<T extends Identifiable>(kind: ResourceType<T>, id: string): Promise<T> {
    const result = this.entityMap.get(kind.typeId).find(e => e.id === id);
    if (result) {
      return Promise.resolve(result as T);
    } else {
      return Promise.reject(new Error(`${kind.typeId} with ID=${id} not found.`));
    }
  }
  create<T extends Identifiable>(kind: ResourceType<T>, entity: T): Promise<T> {
    entity.id = this.getNextId();
    this.entityMap.get(kind.typeId).push(entity);
    return Promise.resolve(entity);
  }
  update<T extends Identifiable>(kind: ResourceType<T>, entity: T): Promise<T> {
    const collection = this.entityMap.get(kind.typeId);
    const index = collection.findIndex(e => e.id === entity.id);
    if (index < 0) {
      return Promise.reject(new Error(`${kind.typeId} ${JSON.stringify(entity)} not found.`));
    }
    collection[index] = entity;
    return Promise.resolve(entity);
  }

  deleteById<T extends Identifiable>(kind: ResourceType<T>, id: string): Promise<T> {
    const collection = this.entityMap.get(kind.typeId);
    const index = collection.findIndex(e => e.id === id);
    if (index < 0) {
      return Promise.reject(new Error(`${kind.typeId} with ID=${id} not found.`));
    }
    const removed = collection.splice(index, 1)[0];
    return Promise.resolve(removed as T);
  }

protected getNextId(): IdType {
  return ++PromiseBackendMockService.nextId + '';
}

}
