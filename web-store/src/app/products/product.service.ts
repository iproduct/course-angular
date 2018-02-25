import { Injectable } from '@angular/core';
import { BackendService } from '../core/backend.service';
import { Product } from './product.model';

@Injectable()
export class ProductService {

constructor(private backend: BackendService) { }

findAll() {
  return this.backend.findAll(Product);
}

}
