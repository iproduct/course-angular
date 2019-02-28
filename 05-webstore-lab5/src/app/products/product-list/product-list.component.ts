import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../product.model';

@Component({
  selector: 'ws-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  selectedProduct: Product;
  selectedMode: string;

  constructor(private service: ProductService) { }

  ngOnInit() {
    this.service.find().then(products => this.products = products);
  }

  selectProduct(product: Product) {
    this.selectedProduct = product;
  }

  selectMode(mode: string) {
    this.selectedMode = mode;
  }

  handleProductChange(product: Product) {
    if (product.id) {
      this.service.update(product);
    } else {
      this.service.add(product);
    }
    this.service.find().then(products => this.products = products);
  }

  addProduct() {
    this.selectedProduct = new Product(undefined, undefined);
    this.selectedMode = 'create';
  }

}
