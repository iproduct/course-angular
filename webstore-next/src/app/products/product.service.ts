import { Injectable } from '@angular/core';
import { BackendMockService } from '../core/backend-mock.service';
import { Product } from './product.model';
import { IdType } from '../shared/shared-types';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private backend: BackendMockService) { }

  find(): Promise<Product[]> {
    return this.backend.find(Product);
  }

  add (entity: Product): Promise<Product> {
    return this.backend.add(Product, entity);
  }

  update(entity: Product): Promise<Product> {
    return this.backend.update(Product, entity);
  }

  delete(id: IdType): Promise<Product> {
    return this.backend.delete(Product, id);
  }

}
