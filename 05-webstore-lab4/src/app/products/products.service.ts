import { Injectable } from '@angular/core';
import { BackendMockService } from '../core/backend-mock.service';
import { Product } from './product.model';
import { IdType } from '../shared/shared-types';
import { ProductsModule } from './products.module';

@Injectable()
export class ProductsService {

  constructor(private backend: BackendMockService) { }

  find(): Promise<Product[]> {
    return this.backend.find(Product);
  }

  add(p: Product): Promise<Product> {
    return this.backend.add(Product, p);
  }

  remove(id: IdType): Promise<Product> {
    return this.backend.remove(Product, id);
  }
}
