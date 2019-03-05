import { Component, OnInit, Input, ViewChild, AfterViewChecked, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { Product } from '../product.model';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormControl, NgForm, AbstractControl } from '@angular/forms';
import { formArrayNameProvider } from '@angular/forms/src/directives/reactive_directives/form_group_name';

@Component({
  selector: 'ws-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit, OnChanges, AfterViewChecked {
  @Input() mode = 'present';
  @Input('product') productMaster: Product = new Product('', 0, '');
  @Output() productChange = new EventEmitter<Product>();
  @ViewChild(NgForm) form: NgForm;
  productForm: NgForm;
  product: Product;

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
      required: 'Price is required.'
    },
    description: {
      required: 'Description is required.'
    },
    imageUrl: {
      pattern: 'Image URL should be valid (ex. http://example.com/image/path.jpeg).'
    }
  };

  constructor() { }

  ngOnInit() {
    if (this.form) {
      this.form.statusChanges
        .subscribe(data => this.onStatusChanged(data));
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.productMaster.currentValue !== changes.productMaster.previousValue) {
      this.resetProduct();
    }
  }

  ngAfterViewChecked() {
    this.formChanged();
  }

  resetProduct() {
    this.product = { ...this.productMaster };
  }

  submitProduct() {
    this.productMaster = this.product;
    this.productChange.emit({...this.product});
  }

  formChanged() {
    if (this.form === this.productForm) { return; }
    this.productForm = this.form;
    if (this.productForm) {
      this.productForm.statusChanges
        .subscribe((data) => this.onStatusChanged(data));
    }
  }

  private onStatusChanged(data?: any) {
    if (!this.productForm) { return; }
    const form = this.productForm.form;

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
