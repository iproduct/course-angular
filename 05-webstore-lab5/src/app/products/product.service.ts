import { Injectable } from '@angular/core';
import { BackendMockService } from '../core/backend-mock.service';
import { Product } from './product.model';
import { IdType } from '../shared/shared-types';
import { BackendService } from '../core/backend.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private backend: BackendService) { }

  findAll(): Observable<Product[]> {
    return this.backend.findAll(Product);
  }

  findById(id: IdType): Observable<Product> {
    return this.backend.findById(Product, id);
  }

  add (entity: Product): Observable<Product> {
    return this.backend.add(Product, entity);
  }

  update(entity: Product): Observable<Product> {
    return this.backend.update(Product, entity);
  }

  delete(id: IdType): Observable<Product> {
    return this.backend.delete(Product, id);
  }

}
