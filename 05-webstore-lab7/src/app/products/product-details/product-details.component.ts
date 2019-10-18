import { Component, OnInit, Input, EventEmitter, Output, OnChanges, SimpleChanges, ViewChild, AfterViewChecked, OnDestroy } from '@angular/core';
import { Product } from '../product';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ws-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit, OnChanges, AfterViewChecked, OnDestroy {
  @Input() mode = 'present';
  @Input('product') masterProduct: Product;
  @Output() productModified = new EventEmitter<Product>();
  @Output() productCanceled = new EventEmitter<void>();
  @ViewChild(NgForm, {static: false}) form: NgForm;
  product: Product;
  prevForm: NgForm;
  statusSubscription: Subscription;

  formErrors = {
    name: '',
    price: '',
    description: '',
    imageUrl: ''
  };

  validationMessages = {
    name: {
      required: 'Product name is required.',
      minlength: 'Username must be at least 2 characters long.',
      maxlength: 'Username cannot be more than 24 characters long.'
    },
    price: {
      required: 'Price is required.',
      min: 'Price should be positive number.'
    },
    description: {
      minlength: 'Description must be at least 2 characters long.',
      maxlength: 'Description cannot be more than 512 characters long.'
    },
    imageUrl: {
      pattern: 'Image URL should be valid (ex. http://example.com/image/path.jpeg).'
    }
  };

  constructor() { }

  ngOnInit() {
  }
  ngOnChanges(changes: SimpleChanges): void {
    const pChange = changes.masterProduct;
    if (pChange && pChange.currentValue !== pChange.previousValue) {
      this.reset();
    }
  }
  ngAfterViewChecked(): void {
    if (this.form && this.form !== this.prevForm) {
      this.prevForm = this.form;
      if (this.statusSubscription && !this.statusSubscription.closed) {
        this.statusSubscription.unsubscribe();
      }
      this.statusSubscription = this.form.statusChanges.subscribe(() => {
        this.onStatusChanged();
      });
    }
  }
  ngOnDestroy(): void {
    if (this.statusSubscription && !this.statusSubscription.closed) {
      this.statusSubscription.unsubscribe();
    }
  }

  submitProduct() {
    this.masterProduct = this.product;
    this.productModified.emit({...this.product});
  }

  cancelProduct() {
    this.productCanceled.emit();
  }

  reset() {
    this.product = { ...this.masterProduct };
  }

  protected onStatusChanged() {
    if (!this.form) { return; }
    const form = this.form.form;

    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);

      if (control && (control.dirty || control.touched) && control.invalid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }


}
