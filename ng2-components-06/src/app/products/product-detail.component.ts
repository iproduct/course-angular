import { Component, Input } from '@angular/core';

import { Product } from './product.model';

@Component({
  // moduleId: module.id,
  selector: 'product-detail',
  templateUrl: './product-detail.component.html'
})
export class ProductDetailComponent {
  @Input()
  public product: Product;
}
