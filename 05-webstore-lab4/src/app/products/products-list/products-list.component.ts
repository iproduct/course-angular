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

  constructor(private service: ProductsService) {}

  ngOnInit() {
    this.service.find().then(products => (this.products = products));
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
        this.service.edit(product).then(editedProduct => {
          const index = this.products.findIndex(p => p.id === editedProduct.id);
          this.products[index] = editedProduct;
          this.selected = editedProduct;
        });
      } else {
        this.service.add(product).then(addedProduct => {
          this.products.push(addedProduct);
          this.selected = addedProduct;
        });
      }
    } else {
      this.selected = undefined;
    }
  }
}
