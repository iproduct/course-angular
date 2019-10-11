import { Injectable } from '@angular/core';
import { BackendPromiseService } from '../core/backend-promise.service';
import { Product } from './product';
import { IdType } from '../shared/common-types';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private backend: BackendPromiseService) { }

  find() {
    return this.backend.find(Product);
  }
  findById(id: IdType) {
    return this.backend.findById(Product, id);
  }
  add(entity: Product) {
    return this.backend.add(Product, entity);
  }
  update(entity: Product) {
    return this.backend.update(Product, entity);
  }
  delete(id: IdType) {
    return this.backend.delete(Product, id);
  }
}
