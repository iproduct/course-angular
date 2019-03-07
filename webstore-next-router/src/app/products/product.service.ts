import { Injectable } from '@angular/core';
import { Product } from './product.model';
import { IdType } from '../shared/shared-types';
import { BackendService } from '../core/backend.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private backend: BackendService) { }

  find(): Observable<Product[]> {
    return this.backend.findAll(Product);
  }

  create (entity: Product): Observable<Product> {
    return this.backend.create(Product, entity);
  }

  update(entity: Product): Observable<Product> {
    return this.backend.update(Product, entity);
  }

  delete(id: IdType): Observable<Product> {
    return this.backend.delete(Product, id);
  }

}
