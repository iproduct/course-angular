import { Component, OnInit, Input, ViewChild, EventEmitter, Output, HostBinding } from '@angular/core';
import { Product } from '../product.model';
import { LoggerService } from '../../core/logger.service';
import { NgForm } from '@angular/forms';
import { slideInDownAnimation } from '../../shared/animations';

@Component({
  selector: 'ws-product-detail',
  templateUrl: './product-detail.component.html',
  animations: [ slideInDownAnimation ],
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  @Input() product: Product;
  @Output() productChange = new EventEmitter<Product>();
  @ViewChild('form') form: NgForm;
  @HostBinding('@routeAnimation') routeAnimation = true;

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
