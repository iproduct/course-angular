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
    this.products = await this.service.find().toPromise();
  }

  selectProduct(product: Product) {
    this.selectedProduct = product;
  }

  selectMode(mode: string) {
    this.selectedMode = mode;
  }

  async handleProductChange(product: Product) {
    if (product.id) {
      await this.service.update(product).toPromise();
    } else {
      await this.service.add(product).toPromise();
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
    this.refresh();
  }

}
