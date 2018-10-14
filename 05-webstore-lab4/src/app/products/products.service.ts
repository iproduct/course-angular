import { Injectable } from '@angular/core';
import { BackendMockService } from '../core/backend-mock.service';
import { Product } from './product.model';
import { IdType } from '../shared/shared-types';
import { ProductsModule } from './products.module';
import { BackendPromiseService } from '../core/backend-promise.service';
import { BackendService } from '../core/backend.service';
import { Observable, Subject } from 'rxjs';
import { tap, flatMap } from 'rxjs/operators';

@Injectable()
export class ProductsService {

  changes$ = new Subject<void>();

  constructor(private backend: BackendService) { }

  find(): Observable<Product[]> {
    return this.changes$.pipe(
      flatMap(_ => this.backend.findAll(Product))
    );
  }

  findById(id: IdType): Observable<Product> {
    return this.backend.findById(Product, id);
  }

  add(p: Product): Observable<Product> {
    return this.backend.create(Product, p).pipe(
      tap(_ => this.changes$.next())
    );
  }

  edit(p: Product): Observable<Product> {
    return this.backend.update(Product, p).pipe(
      tap(_ => this.changes$.next())
    );
  }

  remove(id: IdType): Observable<Product> {
    return this.backend.remove(Product, id).pipe(
      tap(_ => this.changes$.next())
    );
  }

  refresh(): void {
    this.changes$.next();
  }
}
