import { Injectable } from '@angular/core';

import { Product } from './product.model';
import { BackendService } from '../shared/backend.service';
import { Logger } from '../shared/logger.service';

@Injectable()
export class ProductService {

  constructor(
    private backend: BackendService,
    private logger: Logger) { }

  public getProducts() {
    return this.backend.findAll(Product).then(
      products => {
        this.logger.log(`Fetched ${products.length} products.`);
        return products;
      });
  }

  public getProduct(id: number): Promise<Product> {
    return this.backend.find(Product, id);
  }

  public addProduct(product: Product): Promise<Product> {
    return this.backend.add(Product, product);
  }

  public editProduct(product: Product): Promise<Product> {
    return this.backend.edit(Product, product);
  }

  public deleteProduct(productId: number): Promise<Product> {
    return this.backend.delete(Product, productId);
  }
}
