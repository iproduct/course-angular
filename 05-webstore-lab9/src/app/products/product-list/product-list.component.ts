import { Component, OnInit, HostBinding } from '@angular/core';
import { Product } from '../product.model';
import { ProductsService } from '../products.service';
import { MessageService } from '../../core/message.service';
import { slideInDownAnimation } from '../../shared/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { PRODUCTS_ROUTE } from '../../app-routing.module';

@Component({
  selector: 'ws-product-list',
  animations: [ slideInDownAnimation ],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  @HostBinding('@routeAnimation') routeAnimation = true;

  products: Product[] = [];
  selectedProduct: Product | undefined;
  currentMode = 'present';
  messages: string | undefined;
  errors: string | undefined;

  constructor(private service: ProductsService, private messageService: MessageService,
              private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(qparams => {
      if (qparams['refresh']) {
        this.refresh();
      }
    });
    this.refresh();
  }

  selectProduct(product: Product) {
    this.selectedProduct = product;
    this.router.navigate([PRODUCTS_ROUTE, this.currentMode, product.id]);
  }

  setMode(mode: string) {
    this.currentMode = mode;
  }

  onAddProduct() {
    this.setMode('edit');
    this.selectProduct(new Product(undefined, undefined));
    this.router.navigate(['products', 'create']);
  }

  onEditProduct(product: Product) {
    this.setMode('edit');
    this.selectProduct(product);
    this.router.navigate(['products', 'edit', product.id]);
  }

  onDeleteProduct(product: Product) {
    this.service.deleteById(product.id)
      .subscribe(
        deleted => {
          const index = this.products.findIndex(p => p.id === deleted.id);
          this.products.splice(index, 1);
          this.showMessage(`Product ${deleted.name} was successfully deleted.`);
        },
        err => this.showError(err)
      );
  }

  onProductModified(product: Product) {
    if (product.id) { // edit mode
      this.service.update(product).subscribe(
        updated => {
          const index = this.products.findIndex(p => p.id === updated.id);
          this.products[index] = updated;
          this.showMessage(`Product '${updated.name}' updated successfully.`);
        },
        err => this.showError(err)
      );
    } else {
      this.service.create(product).subscribe(
        created => {
          this.products.push(created);
          this.showMessage(`Product '${created.name}' created successfully.`);
        },
        err => this.showError(err)
      );
    }
  }

  onProductCanceled() {
    this.selectProduct(undefined);
  }

  private refresh() {
    this.service.findAll()
      .subscribe(
        products => this.products = products,
        err => this.showError(err));
  }

  private showMessage(msg) {
    this.messageService.success(msg);
  }

  private showError(err) {
    this.messageService.error(err);
  }

}
