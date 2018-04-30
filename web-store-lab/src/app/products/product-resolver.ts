import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { Product } from './product.model';
import { ProductsService } from './products.service';

@Injectable()
export class ProductResolver implements Resolve<Product> {
  constructor(private service: ProductsService, private router: Router) { }

  public resolve(route: ActivatedRouteSnapshot) {
    const id = route.params['productId'];
    return this.service.find(id);
  }
}
