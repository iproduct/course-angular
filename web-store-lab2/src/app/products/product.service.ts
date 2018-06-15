import { Injectable } from '@angular/core';
import { PRODUCTS } from './products-mock-data';
import { KeyType } from '../shared/common-types';
import { Product } from './product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor() { }

  findAll() {
    return Promise.resolve(PRODUCTS);
  }

  find(id: KeyType) {
    const product = PRODUCTS.find(el => el.id === id);
    if (product) {
      return Promise.resolve(product);
    } else {
      return Promise.reject(new Error('Invalid product ID.'));
    }
  }

  create(product: Product) {
    product.id = Date.now();
    PRODUCTS.push(product);
    return Promise.resolve(product);
  }

  update(product: Product) {
    const index = PRODUCTS.findIndex(el => el.id === product.id);
    if (index >= 0) {
      PRODUCTS[index] = product;
      return Promise.resolve(product);
    } else {
      return Promise.reject(new Error(`Product ${product.name} does not exist.`));
    }
  }

  delete(id: KeyType) {
    const index = PRODUCTS.findIndex(el => el.id === id);
    let product: Product;
    if (index >= 0) {
      product = PRODUCTS[index];
      PRODUCTS.splice(index, 1);
      return Promise.resolve(product);
    } else {
      return Promise.reject(new Error(`Product ${product.name} does not exist.`));
    }
  }
}
