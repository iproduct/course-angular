import { Component, OnInit } from '@angular/core';
import { Product } from '../product.model';
import { ProductsService } from '../products.service';

@Component({
  selector: 'ws-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {
  products: Product[] = [];
  selected: Product;
  errors: string;

  constructor(private service: ProductsService) {}

  ngOnInit() {
    this.service
      .find()
      .then(
        products => this.products = products,
        error => this.errors = error
      );
  }

  selectProduct(product) {
    this.selected = product;
  }

  addNewProduct() {
    this.selected = new Product(undefined, undefined);
  }

  editProduct(product: Product) {
    if (product) {
      if (product.id) {
        this.service.edit(product).then(
          editedProduct => {
            const index = this.products.findIndex(
              p => p.id === editedProduct.id
            );
            this.products[index] = editedProduct;
            this.selected = editedProduct;
          },
          error => this.errors = error
        );
      } else {
        this.service.add(product).then(
          addedProduct => {
            this.products.push(addedProduct);
            this.selected = addedProduct;
          },
          error => this.errors = error
        );
      }
    } else {
      this.selected = undefined;
    }
  }
}
