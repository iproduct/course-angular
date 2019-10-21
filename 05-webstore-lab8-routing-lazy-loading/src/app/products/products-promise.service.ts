import { Injectable } from '@angular/core';
import { BackendMockService } from '../core/backend-mock.service';
import { Product } from './products.model';
import { IdType } from '../shared/shared-types';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private backend: BackendMockService) {
  }

  find() {
    return this.backend.find(Product);
  }

  add(product: Product) {
    return this.backend.add(Product, product);
  }

  update(product: Product) {
    return this.backend.update(Product, product);
  }

  delete(productId: IdType) {
    return this.backend.delete(Product, productId);
  }
}
