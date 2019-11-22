/*
 * Copyright (c) 2015-2017 IPT-Intellectual Products & Technologies (IPT).
 * All rights reserved.
 *
 * This file is licensed under terms of GNU GENERAL PUBLIC LICENSE Version 3
 * (GPL v3). The full text of GPL v3 license is providded in file named LICENSE,
 * residing in the root folder of this project.
 *
 */

import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { take, catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { ProductsService } from './products.service';
import { Product } from './product.model';

@Injectable()
export class ProductResolver implements Resolve<Product | undefined> {
  constructor(private service: ProductsService, private router: Router) { }

  public resolve(route: ActivatedRouteSnapshot) {
    const id = route.params['productId'];
    return this.service.findById(id).pipe(
      take(1),
      map(product => {
        if (product) {
          return product;
        } else { // id not found
            // window.history.back();
            this.router.navigate(['/products']);
            return undefined;
        }
      }),
      catchError(() => {
        this.router.navigate(['/products']);
        return throwError(`Product with ID:${id} not found.`);
      })
    );
  }
}
