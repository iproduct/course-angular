import { Component } from '@angular/core';
import { Product } from './product.model';

const PRODUCTS = [
  new Product('Logitech Mouse', 12.99, 'Super mouse'),
  new Product('Wirelesss Keyboard', 23.85, 'Type wherever you are!'),
  new Product('Whiteboard Marker', 0.32, 'Drawing is fun!')
];

@Component({
  selector: 'prod-list',
  template: `
    <h2>Product Catalog</h2>
    <p><i>Choose a product</i></p>
    <ul>
      <li *ngFor='let product of products'>
      {{product.name}} - {{product.price}}
      </li>
    </ul>
  `
})
export class ProductListComponent {
  public products = PRODUCTS;
}
