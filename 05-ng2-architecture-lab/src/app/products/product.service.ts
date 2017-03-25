import { BackendService } from '../shared/backend.service';
import { Logger } from '../shared/logger.service';
import { Product } from './product.model';
import { Injectable } from '@angular/core';

@Injectable()
export class ProductService {
  private products: Product[] = [];

  constructor(private backend: BackendService, private logger: Logger){}

  public getProducts() {
    this.backend.getAll(Product).then((products: Product[]) => {
      this.logger.log(`Fetched ${products.length} products.`);
      this.products.push(...products);
    }).catch(
      err => this.logger.error(`ProductService error: ${err}`)
    );
    return this.products;
  }
}
