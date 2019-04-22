import { Component, OnInit, Input, Output, EventEmitter, ViewChild,
  OnChanges, SimpleChanges } from '@angular/core';
import { Product } from '../product.model';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'ws-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit, OnChanges {
  // tslint:disable-next-line:no-input-rename
  @Input('product') masterProduct: Product;
  @Input() isNew: boolean;
  @Output() productUpdated = new EventEmitter<Product> ();
  @ViewChild('form') form: NgForm;

  product: Product;
  formErrors = {
    name: '',
    price: '',
    description: '',
    imageUrl: ''
  };

  mode = 'edit';

  constructor() { }

  ngOnInit() {
    this.resetProduct();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.masterProduct && changes.masterProduct.currentValue !== changes.masterProduct.previousValue) {
      this.resetProduct();
    }
  }

  submitProduct() {
    this.masterProduct = this.product;
    this.productUpdated.emit(this.product);
  }

  resetProduct() {
    this.product = { ...this.masterProduct };
  }

  cancelProduct() {
    this.productUpdated.emit(undefined);
  }

  getImageUrl() {
    return this.product.imageUrl ? this.product.imageUrl : 'assets/img/product.png';
  }

}
