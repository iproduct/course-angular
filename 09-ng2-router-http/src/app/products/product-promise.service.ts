import { Injectable } from '@angular/core';

import { Product } from './product.model';
import { BackendService } from '../common/backend.service';
import { Logger } from '../common/logger.service';

@Injectable()
export class ProductService {

  constructor(
    private backend: BackendService,
    private logger: Logger) { }

  public getProducts(): Promise<Product[]> {
    return this.backend.findAll(Product).then(
      products => {
        this.logger.log(`Fetched ${products.length} products.`);
        return products;
      });
  }

  public getProduct(id: string): Promise<Product> {
    return this.backend.find(Product, id);
  }

  public addProduct(product: Product): Promise<Product> {
    return this.backend.add(Product, product);
  }

  public editProduct(product: Product): Promise<Product> {
    return this.backend.edit(Product, product);
  }

  public deleteProduct(productId: string): Promise<Product> {
    return this.backend.delete(Product, productId);
  }
}
