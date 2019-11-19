import { Injectable } from '@angular/core';
import { PromiseBackendMockService } from '../core/promise-backend-mock.service';
import { Product } from './product.model';
import { IdType } from '../shared/common-types';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private backend: PromiseBackendMockService) { }

  findAll(): Promise<Product[]> {
    return this.backend.findAll(Product);
  }
  findById(id: IdType): Promise<Product> {
    return this.backend.findById(Product, id);
  }
  create(entity: Product): Promise<Product> {
    return this.backend.create(Product, entity);
  }
  update(entity: Product): Promise<Product> {
    return this.backend.update(Product, entity);
  }
  deleteById(id: IdType): Promise<Product> {
    return this.backend.deleteById(Product, id);
  }

}
