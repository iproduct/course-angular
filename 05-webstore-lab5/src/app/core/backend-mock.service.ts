import { Injectable, Type } from '@angular/core';
import { PRODUCTS } from './mock-data';
import { Identifiable, ResourseType, IdType } from '../shared/shared-types';

@Injectable({
  providedIn: 'root'
})
export class BackendMockService {
  private static nextId = 1;
  private products = [...PRODUCTS];

  constructor() {
    this.products.forEach(p => p.id = BackendMockService.nextId++ + '');
  }

  find<T extends Identifiable> (kind: ResourseType<T>): Promise<T[]> {
    if (kind.typeId === 'Product') {
      return Promise.resolve([...this.products] as T[]);
    }
  }

  add<T extends Identifiable> (kind: ResourseType<T>, entity: T): Promise<T> {
    entity.id = BackendMockService.nextId++ + '';
    if (kind.typeId === 'Product') {
      this.products.push(entity);
      return Promise.resolve(entity as T);
    }
  }

  update<T extends Identifiable> (kind: ResourseType<T>, entity: T): Promise<T> {
    if (kind.typeId === 'Product') {
      const index = this.products.findIndex(e => e.id === entity.id);
      this.products[index] = entity;
      return Promise.resolve(entity as T);
    }
  }

  delete<T extends Identifiable> (kind: ResourseType<T>, id: IdType): Promise<T> {
    if (kind.typeId === 'Product') {
      const index = this.products.findIndex(e => e.id === id);
      const entity = this.products.splice(index, 1)[0];
      return Promise.resolve(entity as T);
    }
  }

}
