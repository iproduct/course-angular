import { Injectable } from '@angular/core';
import { Product } from './product.model';
import { PRODUCTS } from './products-mock-data';
import { Identifiable, IdType } from '../shared/common-types';
import { BackendHttpService } from '../core/backend-http.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  static nextId = 1;

  private products = PRODUCTS as Product[];

  constructor(private backend: BackendHttpService) {}

  findAll() {
    return this.backend.findAll(Product);
  }

  findById(id: IdType) {
    return this.backend.findById(Product, id);
  }

  create(product: Product) {
    return this.backend.create(Product, product);
  }

  update(product: Product) {
    return this.backend.update(Product, product);
  }

  delete(id: IdType) {
    return this.backend.delete(Product, id);
  }

}
