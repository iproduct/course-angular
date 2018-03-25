import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Router } from '@angular/router';
import { Product } from './product.model';
import { Observable } from 'rxjs/Observable';
import { ProductService } from './product.service';

@Injectable()
export class ProductResolver implements Resolve<Product> {

  constructor(private service: ProductService, private router: Router){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Product | Observable<Product> | Promise<Product> {
    const id = route.params.productId;
    console.log(id);
    if(id) {
      return this.service.find(id);
    } else {
      this.router.navigate(['/products']);
    }
  }
}
