import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { ProductsService } from '../products.service';

export type CurrentMode = 'present' | 'edit';

@Component({
  selector: 'ws-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {
  products: Product[] = [];
  selectedProduct: Product | undefined;
  currentMode: CurrentMode = 'present';
  messages: string | undefined;
  errors: string | undefined;

  constructor(private service: ProductsService) { }

  ngOnInit() {
    this.service.find()
      .then(products => this.products = products)
      .catch(err => this.showError(err));
  }

  selectProduct(product: Product) {
    this.selectedProduct = product;
  }

  setMode(mode: CurrentMode) {
    this.currentMode = mode;
  }

  protected showError(err: string) {
    this.errors = err;
    this.messages = undefined;
  }

  protected showMessage(message: string) {
    this.errors = undefined;
    this.messages = message;
  }

  onProductModified(product: Product) {
    if (product.id) {
      this.service.update(product)
        .then(p => this.showMessage(`Product '${p.name}' successfully updated.`))
        .catch(err => this.showError(err));
    } else {
      this.service.add(product)
      .then(p => this.showMessage(`Product '${p.name}' successfully added.`))
      .catch(err => this.showError(err));
    }
  }

  onProductCanceled() {
    this.selectProduct(undefined);
  }

  onAddProduct() {
    this.setMode('edit');
    this.selectProduct(new Product(undefined, undefined));
  }

  onDeleteProduct(product: Product) {
    this.service.delete(product.id)
        .then(p => this.showMessage(`Product '${p.name}' successfully deleted.`))
        .catch(err => this.showError(err));
  }
}
