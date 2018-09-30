import { Component, OnInit, Input, ViewChild, EventEmitter, Output } from '@angular/core';
import { Product } from '../product.model';
import { LoggerService } from '../../core/logger.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'ws-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  @Input() product: Product;
  @Output() productChange = new EventEmitter<Product>();
  @ViewChild('form') form: NgForm;

  constructor(private logger: LoggerService) { }

  ngOnInit() {
  }

  submitForm() {
    this.logger.log(this.form.value);
    this.logger.log(this.form.valid);
    this.productChange.emit(this.form.value);
  }

  resetForm() {
    this.form.reset(this.product);
  }

  cancelForm() {
    this.productChange.emit(null);
  }

}
