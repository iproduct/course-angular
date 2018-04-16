import { Injectable } from '@angular/core';
import { BackendMockService } from '../core/backend-mock.service';
import { Product } from './product.model';
import { IdType } from '../shared/shared-types';

@Injectable()
export class ProductsService {

  constructor(private backend: BackendMockService) { }

  findAll(): Promise<Product[]> {
    return this.backend.findAll<Product>(Product);
  }

  create(product: Product): Promise<Product> {
    return this.backend.create<Product>(Product, product);
  }

  update(product: Product): Promise<Product> {
    return this.backend.update<Product>(Product, product);
  }

  remove(id: IdType): Promise<Product> {
    return this.backend.remove<Product>(Product, id);
  }

}
