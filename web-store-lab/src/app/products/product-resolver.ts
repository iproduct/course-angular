import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { Product } from './product.model';
import { ProductsService } from './products.service';
import { take, map, catchError } from 'rxjs/operators';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';

@Injectable()
export class ProductResolver implements Resolve<Product> {
  constructor(private service: ProductsService, private router: Router) { }

  public resolve(route: ActivatedRouteSnapshot) {
    const id = route.params['productId'];
    return this.service.find(id).pipe(
      take(1),
      map(product => {
        if (product) {
          return product;
        } else { // id not found
            this.router.navigate(['/products']);
            return null;
        }
      }),
      catchError(err => {
        this.router.navigate(['/products']);
        return new ErrorObservable(`Product with ID:${id} not found.`);
      })
    );
  }
}
