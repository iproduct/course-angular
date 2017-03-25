import { Component, Input } from '@angular/core';
import { Product } from './product.model';

@Component({
  selector: 'product-detail',
  templateUrl: './product-detail.component.html'
})
export class ProductDetailComponent {
  @Input()
  public product: Product;
}
