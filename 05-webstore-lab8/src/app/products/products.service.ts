import { Injectable, Inject } from '@angular/core';
import { BackendMockService } from '../core/backend-mock.service';
import { Product } from './products.model';
import { IdType } from '../shared/shared-types';
import { BackendService } from '../core/backend.service';
import { BACKEND_SERVICE } from '../core/core.module';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(@Inject(BACKEND_SERVICE) private backend: BackendService) {
  }

  findAll() {
    return this.backend.findAll(Product);
  }

  findById(productId: IdType) {
    return this.backend.findById(Product, productId);
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
