import { Component, OnInit, Input, Output, EventEmitter, ViewChild,
  OnChanges, SimpleChanges } from '@angular/core';
import { Product } from '../product.model';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'ws-product-detail-reactive',
  templateUrl: './product-detail-reactive.component.html',
  styleUrls: ['./product-detail-reactive.component.scss']
})
export class ProductDetailReactiveComponent implements OnInit, OnChanges {
  @Input() product: Product;
  @Input() isNew: boolean;
  @Output() productUpdated = new EventEmitter<Product> ();
  @ViewChild('form') form: NgForm;

  productForm: FormGroup;

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

  mode = 'edit';

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.productForm = this.fb.group({
      id: {value: this.product.id, disabled: true },
      name: [
        this.product.name,
        [Validators.required, Validators.minLength(2), Validators.maxLength(32)]
      ],
      price: [
        this.product.price,
        [Validators.required, Validators.min(0)]
      ],
      description: [
        this.product.description,
        [Validators.minLength(2), Validators.maxLength(512)]
      ],
      imageUrl: [
        this.product.imageUrl,
        [Validators.pattern(/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/)]
      ],
    });
    this.productForm.statusChanges.subscribe( () => this.onStatusChanged() );
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.product && changes.product.currentValue !== changes.product.previousValue) {
      this.resetProduct();
    }
  }

  submitProduct() {
    this.product = this.productForm.getRawValue();
    this.productUpdated.emit(this.product);
  }

  resetProduct() {
    if (this.productForm) {
      this.productForm.reset(this.product);
    }
  }

  cancelProduct() {
    this.productUpdated.emit(undefined);
  }

  private onStatusChanged(data?: any) {
    if (!this.productForm) { return; }
    const form = this.productForm;

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

  getImageUrl() {
    return this.product.imageUrl ? this.product.imageUrl : 'assets/img/product.png';
  }

}
