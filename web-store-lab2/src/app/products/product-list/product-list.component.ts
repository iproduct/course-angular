import { Component, OnInit } from '@angular/core';
import { PRODUCTS } from '../products-mock-data';
import { KeyType } from '../../shared/common-types';
import { Product } from '../product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'ws-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  errors: string;
  products: Product[];
  selected: Product;
  isNewProduct = false;

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.refresh();
  }

  addProduct() {
    this.isNewProduct = true;
    this.selected = new Product(null, null, null);
  }

  selectProduct(product: Product) {
    this.isNewProduct = false;
    this.selected = product;
  }

  submitProduct(product: Product) {
    if (!product) {
      this.selected = undefined;
      return;
    }
    if (this.isNewProduct) {
      this.productService.create(product)
        .then(() => this.refresh());
    } else {
      this.productService.update(product)
        .then(() => this.refresh());
    }
  }

  refresh() {
    this.productService.findAll()
      .then(products => this.products = products);
  }

}
