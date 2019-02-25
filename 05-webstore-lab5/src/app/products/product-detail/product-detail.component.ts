import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../product.model';

@Component({
  selector: 'ws-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  @Input() mode = 'present';
  @Input() product: Product = new Product('', 0, '');

  constructor() { }

  ngOnInit() {
  }

}
