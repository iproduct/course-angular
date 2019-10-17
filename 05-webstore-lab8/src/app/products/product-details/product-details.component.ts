import { Component, OnInit, Input, Output, EventEmitter, OnChanges,
  SimpleChanges, ViewChild, AfterViewChecked } from '@angular/core';
import { Product } from '../products.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'ws-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit, OnChanges, AfterViewChecked {
  @Input('product') masterProduct = new Product('', 0, '');
  @Input() mode = 'none';
  @Output() productChange = new EventEmitter<Product>();
  @Output() productCancel = new EventEmitter<void>();
  product: Product;
  @ViewChild(NgForm, {static: false}) form: NgForm;
  private previousForm: NgForm;

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
    this.resetProduct();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.masterProduct.currentValue !== changes.masterProduct.previousValue){
      this.resetProduct();
    }
  }

  ngAfterViewChecked(): void {
    if (this.form && this.form !== this.previousForm) {
      this.previousForm = this.form;
      this.form.statusChanges.subscribe(status => this.onStatusChanged());
    }
  }

  resetProduct() {
    this.product = Object.assign({}, this.masterProduct);
  }

  submitProduct() {
    this.masterProduct = this.product;
    this.productChange.emit({ ...this.product });
  }

  cancelProduct() {
    this.productCancel.emit();
  }

  private onStatusChanged() {
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
