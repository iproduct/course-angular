import { Injectable, Type } from '@angular/core';
import { PRODUCTS } from './mock-data';
import { Identifiable, ResourseType, IdType } from '../shared/shared-types';
import { P } from '@angular/core/src/render3';

@Injectable({
  providedIn: 'root'
})
export class BackendMockService {
  private static nextId = 1;

  constructor() {
    PRODUCTS.forEach(p => p.id = BackendMockService.nextId++ + '');
  }

  find<T extends Identifiable> (kind: ResourseType<T>): Promise<T[]> {
    if (kind.typeId === 'Product') {
      return Promise.resolve([...PRODUCTS] as T[]);
    }
  }

  add<T extends Identifiable> (kind: ResourseType<T>, entity: T): Promise<T> {
    entity.id = BackendMockService.nextId++ + '';
    if (kind.typeId === 'Product') {
      PRODUCTS.push(entity);
      return Promise.resolve(entity as T);
    }
  }

  update<T extends Identifiable> (kind: ResourseType<T>, entity: T): Promise<T> {
    if (kind.typeId === 'Product') {
      const index = PRODUCTS.findIndex(e => e.id === entity.id);
      PRODUCTS[index] = entity;
      return Promise.resolve(entity as T);
    }
  }

  delete<T extends Identifiable> (kind: ResourseType<T>, id: IdType): Promise<T> {
    if (kind.typeId === 'Product') {
      const index = PRODUCTS.findIndex(e => e.id === entity.id);
      const entity = PRODUCTS.splice(index, 1)[0];
      return Promise.resolve(entity as T);
    }
  }

}
