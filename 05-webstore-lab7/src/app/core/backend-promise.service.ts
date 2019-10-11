import { Injectable } from '@angular/core';
import { Identifiable, ResourceType, IdType } from '../shared/common-types';
import { Product } from '../products/product';
import { PRODUCTS } from '../products/mock-products';


export abstract class BackendPromiseService {
  abstract find<T extends Identifiable>(kind: ResourceType<T>): Promise<T[]>;
  abstract findById<T extends Identifiable>(kind: ResourceType<T>, id: IdType): Promise<T>;
  abstract add<T extends Identifiable>(kind: ResourceType<T>, entity: T): Promise<T>;
  abstract update<T extends Identifiable>(kind: ResourceType<T>, entity: T): Promise<T>;
  abstract delete<T extends Identifiable>(kind: ResourceType<T>, id: IdType): Promise<T>;
}


@Injectable()
export class BackendPromiseServiceMockImpl implements BackendPromiseService {
  private static nextId = 1;

  private entityMap = new Map<string, Identifiable[]>();

  constructor() {
    this.entityMap.set(Product.typeId, PRODUCTS);
    this.entityMap.get(Product.typeId)
      .forEach(p => p.id = this.getNextId());
  }

  find<T extends Identifiable>(kind: ResourceType<T>): Promise<T[]> {
    return Promise.resolve(this.getCollection(kind));
  }
  findById<T extends Identifiable>(kind: ResourceType<T>, id: string): Promise<T> {
    return Promise.resolve(this.getCollection(kind).find(e => e.id === id));
  }
  add<T extends Identifiable>(kind: ResourceType<T>, entity: T): Promise<T> {
    entity.id = this.getNextId();
    this.getCollection(kind).push(entity);
    return Promise.resolve(entity);
  }
  update<T extends Identifiable>(kind: ResourceType<T>, entity: T): Promise<T> {
    const collection = this.getCollection(kind);
    const index = collection.findIndex(e => e.id === entity.id);
    if (index >= 0) {
      collection[index] = entity;
      return Promise.resolve(entity);
    } else {
      return Promise.reject(`${kind.typeId} with ID=${entity.id} not found.`);
    }
  }
  delete<T extends Identifiable>(kind: ResourceType<T>, id: string): Promise<T> {
    const collection = this.getCollection(kind);
    const index = collection.findIndex(e => e.id === id);
    if (index >= 0) {
      return Promise.resolve(collection.splice(index, 1)[0]);
    } else {
      return Promise.reject(`${kind.typeId} with ID=${id} not found.`);
    }
  }

  protected getCollection<T>(kind: ResourceType<T>): T[] {
    return this.entityMap.get(kind.typeId) as unknown as T[];
  }

  protected getNextId(): IdType {
    return BackendPromiseServiceMockImpl.nextId++ + '';
  }


}
