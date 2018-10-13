import { Injectable } from '@angular/core';
import { BackendMockService } from '../core/backend-mock.service';
import { Product } from './product.model';
import { IdType } from '../shared/shared-types';
import { ProductsModule } from './products.module';
import { BackendPromiseService } from '../core/backend-promise.service';
import { BackendService } from '../core/backend.service';
import { Observable } from 'rxjs';

@Injectable()
export class ProductsService {

  constructor(private backend: BackendService) { }

  find(): Observable<Product[]> {
    return this.backend.findAll(Product);
  }

  findById(id: IdType): Observable<Product> {
    return this.backend.findById(Product, id);
  }

  add(p: Product): Observable<Product> {
    return this.backend.create(Product, p);
  }

  edit(p: Product): Observable<Product> {
    return this.backend.update(Product, p);
  }

  remove(id: IdType): Observable<Product> {
    return this.backend.remove(Product, id);
  }
}
