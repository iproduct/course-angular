import { Component, OnInit } from '@angular/core';
import { Product } from '../product.model';
import { ProductsService } from '../products.service';

@Component({
  selector: 'ws-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  selectedProduct: Product | undefined;
  currentMode = 'present';
  messages: string | undefined;
  errors: string | undefined;

  constructor(private service: ProductsService) { }

  ngOnInit() {
    this.refresh();
  }

  selectProduct(product: Product) {
    this.selectedProduct = product;
  }

  setMode(mode: string) {
    this.currentMode = mode;
  }

  private refresh() {
    this.service.findAll()
      .then(
        products => this.products = products,
        err => this.showError(err));
  }

  private showMessage(msg) {
    this.messages = msg;
    this.errors = undefined;
  }

  private showError(err) {
    this.messages = undefined;
    this.errors = err;
  }

}
