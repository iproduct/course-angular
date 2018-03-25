import { Component, OnInit } from '@angular/core';

import { Product } from './product.model';
import { ProductService } from './product.service';

@Component({
  // moduleId: module.id,
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  providers: [ProductService]
})
export class ProductListComponent implements OnInit {
  public products: Product[];
  public selectedProduct: Product;

  constructor(private service: ProductService) { }

  public ngOnInit() {
    this.products = this.service.getProducts();
  }

  public selectProduct(product: Product) { this.selectedProduct = product; }
}
