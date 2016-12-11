import { Injectable, Type } from '@angular/core';

import { Logger } from './logger.service';
import { Product } from '../product/product.model';

const PRODUCTS: Product[] = [
  new Product('Logitech Mouse', 12.99, 'Super mouse'),
  new Product('Wirelesss Keyboard', 23.85, 'Type wherever you are!'),
  new Product('Whiteboard Marker', 0.32, 'Drawing is fun!')
];

@Injectable()
export class BackendService {
  constructor(private logger: Logger) { }

  public getAll (type: Type<any>): (Promise<any>) {
    if (type === Product) {
      // TODO get from the database
      this.logger.log('Backed service called for products');
      return Promise.resolve(PRODUCTS);
    }
    let err = new Error(`Cannot get object of this type : ${type}`);
    return Promise.reject(err);
  }
}
