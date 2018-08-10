import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { Product } from '../product.model';
import { slideInDownAnimation } from '../../shared/animations';

@Component({
  selector: 'ws-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
  @Input() product: Product;

  constructor() { }

  ngOnInit() {
  }

}
