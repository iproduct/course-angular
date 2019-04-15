import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../product.model';

@Component({
  selector: 'ws-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  @Input() product: Product;
  @Input() isNew: boolean;

  formErrors = {
    name: '',
    price: '',
    description: '',
    imageUrl: ''
  };

  mode = 'edit';

  constructor() { }

  ngOnInit() {
  }

  submitProduct() {}
  resetProduct() {}
  getImageUrl() {
    return this.product.imageUrl ? this.product.imageUrl : 'assets/img/product.png';
  }

}
