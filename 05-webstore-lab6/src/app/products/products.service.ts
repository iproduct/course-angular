import { Injectable } from '@angular/core';
import { Product } from './product.model';
import { PRODUCTS } from './products-mock-data';
import { Identifiable, IdType } from '../shared/common-types';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  static nextId = 1;

  private products = PRODUCTS as Product[];

  constructor() {}

  add(p: Product): Promise<Product> {
    p.id = '' + ProductsService.nextId++;
    this.products.push(p);
    return Promise.resolve(p);
  }

  findAll() {
    return Promise.resolve(this.products);
  }

  update(p: Product): Promise<Product> {
    const index = this.products.findIndex(pr => pr.id === p.id);
    if (index < 0) {
      return Promise.reject(new Error(`Product not found Id: ${p.id}`));
    }
    this.products[index] = p;
    return Promise.resolve(p);
  }

  remove(productId: IdType): Promise<Product>{
    const index = this.products.findIndex(pr => pr.id === productId);
    if (index < 0) {
      return Promise.reject(new Error(`Product not found Id: ${productId}`));
    }
    const p = this.products.splice(index, 1);
    return Promise.resolve(p[0]);
  }

}
