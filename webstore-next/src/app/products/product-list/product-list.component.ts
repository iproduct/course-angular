import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../product.model';
import { refreshDescendantViews } from '@angular/core/src/render3/instructions';

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
    this.refresh();
  }

  async refresh() {
    this.products = await this.service.find();
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
    this.selectedProduct = undefined;
    this.refresh();
  }

  addProduct() {
    this.selectedProduct = new Product(undefined, undefined);
    this.selectedMode = 'create';
  }

  productCanceled() {
    this.selectedProduct = undefined;
  }

  deleteProduct(product: Product) {
    this.service.delete(product.id);
    this.service.find().then(products => this.products = products);
  }

}
