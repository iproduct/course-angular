import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { Product } from '../product-list/product.model';

@Component({
  selector: 'tc-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit, OnChanges {
  @Input('product') productMaster: Product;
  @Output() onProductChange = new EventEmitter<Product>();
  @Output() onProductCancel = new EventEmitter<void>();

  public product: Product = new Product(0, '', 0, '');

  constructor() { }

  ngOnInit() {
    this.onReset();
  }

  ngOnChanges(changes: SimpleChanges) {
    const change = changes['productMaster'];
    if (change && change.previousValue !== change.currentValue) {
      this.onReset();
    }
  }

  onReset() {
    this.product = { ...this.productMaster };
  }

  onSubmit() {
    this.onProductChange.emit(this.product);
  }

  onCancel() {
    this.onProductCancel.emit();
  }
}
