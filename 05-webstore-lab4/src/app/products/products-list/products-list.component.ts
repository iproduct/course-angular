import { Component, OnInit, HostBinding } from '@angular/core';
import { Product } from '../product.model';
import { ProductsService } from '../products.service';
import { animate } from '@angular/animations';
import { slideInDownAnimation } from '../../shared/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { IdType } from '../../shared/shared-types';

@Component({
  selector: 'ws-products-list',
  templateUrl: './products-list.component.html',
  animations: [ slideInDownAnimation ],
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {
  @HostBinding('@routeAnimation') routeAnimation = true;

  products: Product[] = [];
  selectedId: IdType;
  errors: string;

  constructor(private service: ProductsService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.refreshProducts();
  }

  selectProduct(product) {
    this.selectedId = product.id;
    this.router.navigate(['products', product.id]);
  }

  addNewProduct() {
    // this.selected = new Product(undefined, undefined);
  }

  editProduct(product: Product) {
    if (product) {
      if (product.id) {
        this.service.edit(product).subscribe(
          editedProduct => {
            const index = this.products.findIndex(
              p => p.id === editedProduct.id
            );
            this.products[index] = editedProduct;
            this.selectedId = editedProduct.id;
          },
          error => this.errors = error
        );
      } else {
        this.service.add(product).subscribe(
          addedProduct => {
            this.products.push(addedProduct);
            this.selectedId = addedProduct.id;
          },
          error => this.errors = error
        );
      }
    } else {
      this.selectedId = undefined;
    }
  }

  deleteProduct(product) {
    this.service.remove(product.id).subscribe(
      removedProduct => {
        const index = this.products.findIndex(
          p => p.id === removedProduct.id
        );
        this.products.splice(index, 1);
        this.selectedId = undefined;
      },
      error => this.errors = error
    );
  }

  refreshProducts() {
    this.service
    .find()
    .subscribe(
      products => this.products = products,
      error => this.errors = error
    );
  }
}
