import { Component } from '@angular/core';
import { Product } from './product.model';

const PRODUCTS = [
  new Product('Logitech Mouse', 12.99, 'Super mouse'),
  new Product('Wirelesss Keyboard', 23.85, 'Type wherever you are!'),
  new Product('Whiteboard Marker', 0.32, 'Drawing is fun!')
];

@Component({
  selector: 'prod-list',
  templateUrl: './product-list.component.html'
})
export class ProductListComponent {
  public products = PRODUCTS;
  public selectedProduct: Product;

  public selectProduct(product: Product): void {
    this.selectedProduct = product;
    console.log(`Product selected: ${JSON.stringify(product)}`);
  }
}
