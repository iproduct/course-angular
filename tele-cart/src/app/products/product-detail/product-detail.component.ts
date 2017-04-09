import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../product-list/product.model';

@Component({
  selector: 'tc-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  @Input()
  public product: Product;

  constructor() { }

  ngOnInit() {
  }

}
