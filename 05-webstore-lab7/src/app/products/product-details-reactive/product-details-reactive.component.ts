import { Component, OnInit, Input, EventEmitter, Output, OnChanges,
  SimpleChanges, ViewChild, AfterViewChecked, OnDestroy } from '@angular/core';
import { Product } from '../product';
import { NgForm, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ws-product-details-reactive',
  templateUrl: './product-details-reactive.component.html',
  styleUrls: ['./product-details-reactive.component.scss']
})
export class ProductDetailsReactiveComponent implements OnInit, OnChanges, OnDestroy {
  @Input() mode = 'present';
  @Input() product: Product;
  @Output() productModified = new EventEmitter<Product>();
  @Output() productCanceled = new EventEmitter<void>();
  form: FormGroup;
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

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.buildForm();
  }
  ngOnChanges(changes: SimpleChanges): void {
    const pChange = changes.product;
    if (pChange && pChange.currentValue !== pChange.previousValue) {
      this.reset();
    }
  }
  ngOnDestroy(): void {
    if (this.statusSubscription && !this.statusSubscription.closed) {
      this.statusSubscription.unsubscribe();
    }
  }

  buildForm() {
    this.form = this.fb.group({
      id: {value: this.product.id, disabled: true},
      name: [this.product.name,
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(24)
        ]
      ],
      price: [this.product.price,
        [
          Validators.required,
          Validators.min(0),
        ]
      ],
      description: [this.product.description,
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(512)
        ]
      ],
      imageUrl: [this.product.imageUrl,
        [
          Validators.pattern(/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/i)
        ]
      ],
    });
    if (this.statusSubscription && !this.statusSubscription.closed) {
      this.statusSubscription.unsubscribe();
    }
    this.statusSubscription = this.form.statusChanges.subscribe(() => {
      this.onStatusChanged();
    });
  }

  submitProduct() {
    this.product = this.form.getRawValue();
    this.productModified.emit(this.product);
  }

  cancelProduct() {
    this.productCanceled.emit();
  }

  reset() {
    if (this.form) {
      this.form.reset(this.product);
    }
  }

  protected onStatusChanged() {
    if (!this.form) { return; }
    const form = this.form;

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
