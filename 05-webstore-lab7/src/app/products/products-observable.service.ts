import { Injectable, Inject } from '@angular/core';
import { BackendService, BACKEND_SERVICE } from '../core/backend.service';
import { Product } from './product';
import { IdType } from '../shared/common-types';

@Injectable({
  providedIn: 'root'
})
export class ProductsObservableService {

  constructor(@Inject(BACKEND_SERVICE) private backend: BackendService) { }
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
