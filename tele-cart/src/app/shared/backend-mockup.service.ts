import { Type } from '@angular/core';
import { Injectable } from '@angular/core';
import { Identifiable } from './common-interfaces';
import { Product } from '../products/product-list/product.model';
import { BackendService } from './backend.service';

const PRODUCTS: Identifiable[] = [
  new Product(1, 'Logitech Mouse', 12.99, 'Super mouse'),
  new Product(2, 'Wirelesss Keyboard', 23.85, 'Type wherever you are!'),
  new Product(3, 'Whiteboard Marker', 0.32, 'Drawing is fun!')
];

@Injectable()
export class BackendMockupService implements BackendService{

  constructor() { }

  findAll<T extends Identifiable>(type: Type<T>): Promise<T[]> {
    switch (type.name) {
      case Product.name: {
        return Promise.resolve(PRODUCTS);
      }
    }
  }

}
