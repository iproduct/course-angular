import { Component, OnInit } from '@angular/core';
import { Product } from '../products.model';
import { ProductsService } from '../products.service';

@Component({
  selector: 'ws-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {
  products: Product[] = [];
  errors: string | undefined;
  messages: string | undefined;
  selectedProduct: Product | undefined;
  selectedMode: string | undefined;

  constructor(private service: ProductsService) { }

  ngOnInit() {
    this.service.find()
      .then(prods => this.products = prods)
      .catch(err => this.showError(err));
  }

  addProduct() {
    this.selectedProduct = new Product(undefined, undefined);
    this.selectedMode = 'edit';
  }

  selectMode(mode: string) {
    this.selectedMode = mode;
  }


  selectProduct(product: Product) {
    this.selectedProduct = product;
  }

  deleteProduct(product: Product) {
    this.service.delete(product.id)
    .then(deleted => this.showMessage(
      `Product '${product.name}' was successfully deleted.`))
    .catch(err => this.showError(
      `Error deleting product '${product.name}'.`
    ));
  }

  productChanged(product: Product) {
    if (!product) {
      return;
    }
    if (product.id) { // edit mode
      this.service.update(product);
    } else { // new product mode
      this.service.add(product);
    }
    this.service.find().then(prods => this.products = prods);
  }

  productCanceled() {
    this.selectedProduct = undefined;
  }

  showError(err: string) {
    this.messages = undefined;
    this.errors = err;
    // this.clearMessagesAfterTimeout(5000);
    // this.openSnackBar(err, 'error');
  }

  showMessage(msg: string) {
    this.messages = msg;
    this.errors = undefined;
    // this.clearMessagesAfterTimeout(5000);
    // this.openSnackBar(err, 'error');
  }

}
