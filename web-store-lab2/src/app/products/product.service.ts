import { Injectable } from '@angular/core';
import { PRODUCTS } from './products-mock-data';
import { KeyType } from '../shared/common-types';
import { Product } from './product.model';
import { BackendService } from '../core/backend.service';
import { ThrowStmt } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private backend: BackendService) { }

  findAll() {
    return this.backend.findAll(Product);
  }

  find(id: KeyType) {
    return this.backend.find(Product, id);
  }

  create(product: Product) {
    return this.backend.create(Product, product);
  }

  update(product: Product) {
    return this.backend.update(Product, product);
  }

  remove(id: KeyType) {
    return this.backend.remove(Product, id);
  }
}
