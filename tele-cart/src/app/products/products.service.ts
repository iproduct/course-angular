import { Injectable } from '@angular/core';
import { Product } from './product-list/product.model';
import { BackendMockupService } from '../shared/backend-mockup.service';

@Injectable()
export class ProductsService {
  private products: Product[] = [];

  constructor(private backend: BackendMockupService) { }

  getProducts(): Product[] {
    this.backend.findAll(Product)
      .then(products => {
        console.log(products);
        this.products.splice(0, this.products.length);
        this.products.push(...products);
      })
      .catch(err => {
        console.error(`ProductService error: ${err}`);
      });
      return this.products;
  }


}
