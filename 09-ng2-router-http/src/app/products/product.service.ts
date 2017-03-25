import { Injectable } from '@angular/core';

import { Product } from './product.model';
import { BackendObservableService } from '../common/backend-observable.service';
import { Logger } from '../common/logger.service';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class ProductService {

  constructor(
    private backend: BackendObservableService,
    private logger: Logger) { }

  public getProductsObservable(): Observable<Product[]> {
    return this.backend.getCollectionObservable(Product);
  }

  public getProductObservable(id: number): Observable<Product> {
    return this.backend.getIndividualObservable(Product, id);
  }

  public refreshProducts(): Promise<void> {
    return this.backend.refreshCollection(Product);
  }

  public addProduct(product: Product): Promise<void> {
    return this.backend.addItem(Product, product);
  }

  public editProduct(product: Product): Promise<void> {
    return this.backend.editItem(Product, product);
  }

  public deleteProduct(productId: number): Promise<void> {
    return this.backend.deleteItem(Product, productId);
  }

  // public getProducts(): Promise<Product[]> {
  //   return this.backend.findAll(Product).then(
  //     products => {
  //       this.logger.log(`Fetched ${products.length} products.`);
  //       return products;
  //     });
  // }

  // public getProduct(id: number): Promise<Product> {
  //   return this.backend.find(Product, id);
  // }

  // public addProduct(product: Product): Promise<Product> {
  //   return this.backend.add(Product, product);
  // }

  // public editProduct(product: Product): Promise<Product> {
  //   return this.backend.edit(Product, product);
  // }

  // public deleteProduct(productId: number): Promise<Product> {
  //   return this.backend.delete(Product, productId);
  // }
}
