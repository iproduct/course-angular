import { Component, OnInit, Inject, HostBinding } from '@angular/core';
import { Product } from '../product';
import { ProductsService } from '../products.service';
import { BACKEND_SERVICE, BackendService } from 'src/app/core/backend.service';
import { ProductsObservableService } from '../products-observable.service';
import { slideInDownAnimation } from '../../shared/animations';

export type CurrentMode = 'present' | 'edit';

@Component({
  selector: 'ws-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
  animations: [ slideInDownAnimation ],
})
export class ProductsListComponent implements OnInit {
  @HostBinding('@routeAnimation') routeAnimation = true;
  products: Product[] = [];
  selectedProduct: Product | undefined;
  currentMode: CurrentMode = 'present';
  messages: string | undefined;
  errors: string | undefined;

  constructor(private service: ProductsObservableService) { }

  ngOnInit() {
    this.refresh();
  }

  private refresh() {
    this.service.find().subscribe(
      products => this.products = products,
      err => this.showError(err)
    );
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
      this.service.update(product).subscribe(
        prod => {
          const index = this.products.findIndex(p => p.id === prod.id);
          this.products[index] = prod;
          this.showMessage(`Product '${prod.name}' successfully updated.`);
        },
        err => this.showError(err)
      );
    } else {
      this.service.add(product).subscribe(
        prod => {
          this.products.push(prod);
          this.showMessage(`Product '${prod.name}' successfully added.`);
        },
        err => this.showError(err)
      );
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
    this.service.delete(product.id).subscribe(
      prod => {
        const index = this.products.findIndex(p => p.id === prod.id);
        this.products.splice(index, 1);
        this.showMessage(`Product '${prod.name}' successfully deleted.`);
      },
      err => this.showError(err)
    );
  }
}
