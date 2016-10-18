import { Component } from '@angular/core';

@Component({
  selector: 'prod-list',
  template: `
    <h2>Product Catalog</h2>
    <p>Product name: {{product}}</p>
  `
})
export class ProductListComponent {
  public product: string = 'DELL Laptop';
}
