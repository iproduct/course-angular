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

  onDeleteProduct(product: Product) {
    this.service.deleteById(product.id)
      .then(
        deleted => {
          const index = this.products.findIndex(p => p.id === deleted.id);
          this.products.splice(index, 1);
          this.showMessage(`Product ${deleted.name} was successfully deleted.`);
        },
        err => this.showError(err)
      );
  }

  onProductModified(product: Product) {

  }

  onProductCanceled() {}

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
