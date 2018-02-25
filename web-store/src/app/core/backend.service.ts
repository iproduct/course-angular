import { Injectable, Type } from '@angular/core';
import { LoggerService } from './logger.service';
import { Product } from '../products/product.model';
import { PRODUCTS } from './products-mock-data';
import { Identifiable } from '../shared/common-types';

@Injectable()
export class BackendService {
  constructor(private logger: LoggerService) {}

  findAll<T extends Identifiable> (type: Type<T>): Promise<T[]> {
    switch (type.name) {
      case Product.name:
        this.logger.log(`BackendService called for Products.`);
        return Promise.resolve(PRODUCTS as T[]);
      default:
        const err = new Error(`Cannot recognize entity type: ${type.name}`);
        return Promise.reject(err);
    }
  }
}

