import { Component, OnInit, HostBinding } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../product.model';
import { refreshDescendantViews } from '@angular/core/src/render3/instructions';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MessageComponent } from '../../shared/message/message.component';
import { slideInDownAnimation } from '../../shared/animations';

@Component({
  selector: 'ws-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  animations: [ slideInDownAnimation ]
})
export class ProductListComponent implements OnInit {
  @HostBinding('@routeAnimation') routeAnimation = true;
  products: Product[] = [];
  selectedProduct: Product;
  selectedMode: string;
  errors: String | undefined = undefined;
  messages: String | undefined = undefined;

  constructor(private service: ProductService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.refresh();
  }

  refresh() {
    this.service.findAll().subscribe(
      products => this.products = products,
      err => this.showErrors(err)
    );
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
      .subscribe(
        p => {
          const index = this.products.findIndex(pr => pr.id === p.id);
          this.products[index] = p;
          this.showMessages(`Successfully updated product: ${p.name}`);
        },
        err => this.showErrors(err)
      );
    } else {
      this.service.add(product)
      .subscribe(
        p => {
          this.products.push(p);
          this.showMessages(`Successfully added product: ${p.name}`);
        },
        err => this.showErrors(err)
      );
    }
    this.selectedProduct = undefined;
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
    .subscribe(
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
      duration: 5000,
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
