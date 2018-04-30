import { Injectable, Inject } from '@angular/core';
import { Product } from './product.model';
import { IdType } from '../shared/shared-types';
import { BACKEND_SERVICE } from '../core/core.module';
import { Observable } from 'rxjs/Observable';
import { BackendService } from '../core/backend.service';

@Injectable()
export class ProductsService {

  constructor(@Inject(BACKEND_SERVICE) private backend: BackendService) { }

  findAll(): Observable<Product[]> {
    return this.backend.findAll<Product>(Product);
  }

  find(id: IdType): Observable<Product> {
    return this.backend.find<Product>(Product, id);
  }

  create(product: Product): Observable<Product> {
    return this.backend.create<Product>(Product, product);
  }

  update(product: Product): Observable<Product> {
    return this.backend.update<Product>(Product, product);
  }

  remove(id: IdType): Observable<Product> {
    return this.backend.remove<Product>(Product, id);
  }

}
