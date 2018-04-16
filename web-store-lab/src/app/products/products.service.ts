import { Injectable } from '@angular/core';
import { BackendMockService } from '../core/backend-mock.service';
import { Product } from './product.model';

@Injectable()
export class ProductsService {

  constructor(private backend: BackendMockService) { }

  findAll(): Promise<Product[]> {
    return this.backend.findAll<Product>(Product);
  }

}
