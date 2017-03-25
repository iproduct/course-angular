import { Injectable } from '@angular/core';

import { Product } from './product.model';
import { BackendService } from '../common/backend.service';
import { Logger } from '../common/logger.service';

@Injectable()
export class ProductService {
  private products: Product[] = [];

  constructor(
    private backend: BackendService,
    private logger: Logger) { }

  public getProducts() {
    this.backend.getAll(Product).then( (products: Product[]) => {
      this.logger.log(`Fetched ${products.length} products.`);
      this.products.push(...products); // fill cache
    }).catch(
      err => this.logger.error(`ProductService Error: ` + err)
    );
    return this.products;
  }
}
