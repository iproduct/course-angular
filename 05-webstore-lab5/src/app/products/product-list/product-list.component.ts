import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../product.model';
import { refreshDescendantViews } from '@angular/core/src/render3/instructions';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MessageComponent } from '../../shared/message/message.component';

@Component({
  selector: 'ws-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  selectedProduct: Product;
  selectedMode: string;
  errors: String | undefined = undefined;
  messages: String | undefined = undefined;

  constructor(private service: ProductService, private snackBar: MatSnackBar) { }

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
      this.service.update(product)
      .then(
        p => {
          const index = this.products.findIndex(pr => pr.id === p.id);
          this.products[index] = p;
          this.showMessages(`Successfully updated product: ${p.name}`);
        },
        err => this.showErrors(err)
      );
    } else {
      this.service.add(product)
      .then(
        p => {
          this.products.push(p);
          this.showMessages(`Successfully added product: ${p.name}`);
        },
        err => this.showErrors(err)
      );
    }
    this.selectedProduct = undefined;
    // this.refresh();
  }

  addProduct() {
    this.selectedProduct = new Product(undefined, undefined);
    this.selectedMode = 'create';
  }

  productCanceled() {
    this.selectedProduct = undefined;
  }

  deleteProduct(product: Product) {
    this.service.delete(product.id)
    .then(
      p => {
        const index = this.products.findIndex(pr => pr.id === p.id);
        this.products.splice(index, 1);
        this.showMessages(`Successfully deleted product: ${p.name}`);
      },
      err => this.showErrors(err)
    );
  }

  openSnackBar(message: string, type: string) {
    this.snackBar.openFromComponent(MessageComponent, {
      duration: 50000,
      data: { message, type, hasAction: true}
    });
  }

  private showErrors(err) {
    this.errors = err;
    this.messages = undefined;
    this.clearMessagesAfterTimeout(5000);
    this.openSnackBar(err, 'error');
  }

  private showMessages(msg) {
    this.errors = undefined;
    this.messages = msg;
    this.clearMessagesAfterTimeout(5000);
    this.openSnackBar(msg, 'success');
  }

  private clearMessagesAfterTimeout(timeout) {
    setTimeout(() => {
      this.messages = undefined;
      this.errors = undefined;
    }, timeout);
  }

}
