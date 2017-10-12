import { IdentityType } from '../shared/shared-types';
import { LoggerService } from '../core/logger.service';
import { Injectable } from '@angular/core';
import { Product } from './product.model';
import { BackendPromiseService } from '../core/backend-promise.service';

@Injectable()
export class ProductService {

  constructor(
    private backend: BackendPromiseService,
    private logger: LoggerService) { }

  public getProducts() {
    return this.backend.findAll(Product).then(
      products => {
        this.logger.log(`Fetched ${products.length} products.`);
        return products;
      });
  }

  public getProduct(id: IdentityType): Promise<Product> {
    return this.backend.find(Product, id);
  }

  public addProduct(product: Product): Promise<Product> {
    return this.backend.add(Product, product);
  }

  public editProduct(product: Product): Promise<Product> {
    return this.backend.edit(Product, product);
  }

  public deleteProduct(productId: IdentityType): Promise<Product> {
    return this.backend.delete(Product, productId);
  }
}
