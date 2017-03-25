import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { Product } from './product.model';
import { ProductService } from './product.service';

@Injectable()
export class ProductResolver implements Resolve<Product> {
  constructor(private service: ProductService, private router: Router) { }

  public resolve(route: ActivatedRouteSnapshot): Promise<Product> | boolean {
    let id = +route.params['id'];
    return this.service.refreshProducts()
      .then(() => this.service.getProductObservable(id).take(1).toPromise());
  }
}
