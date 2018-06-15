import { Component, OnInit, Input, EventEmitter, Output, OnChanges, SimpleChanges } from '@angular/core';
import { Product } from '../product.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { KeyType } from '../../shared/common-types';
import { ProductService } from '../product.service';

@Component({
  selector: 'ws-product-detail-reactive',
  templateUrl: './product-detail-reactive.component.html',
  styleUrls: ['./product-detail-reactive.component.css']
})
export class ProductDetailReactiveComponent implements OnInit, OnChanges {
  @Input() product = new Product(null, null, null);
  @Output() submittedProduct = new EventEmitter<Product>();

  isNewProduct = true;
  productForm: FormGroup;
  errors: string;
  private selectedId: KeyType;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
  ) { }

  ngOnInit() {
    this.buildForm();
    this.isNewProduct = !this.product.id;
    this.resetForm();
  }

  ngOnChanges(changes: SimpleChanges) {
   if (changes.product && changes.product.currentValue !==
    changes.product.previousValue) {
      this.resetForm();
    }
  }

  buildForm() {
    this.productForm = this.fb.group({
      id: {value: this.product.id, disabled: true},
      name: [
        this.product.name,
        [Validators.required, Validators.minLength(2), Validators.maxLength(24)]
      ],
      description: this.product.description,
      price: [
        this.product.price,
        [Validators.required, Validators.min(0)]
      ]
    });
    // this.productForm.valueChanges.subscribe(() => this.onStatusChanges());
    this.productForm.statusChanges.subscribe(() => this.onStatusChanges());
  }

  submitForm() {
    this.product = this.productForm.getRawValue() as Product;
    this.submittedProduct.emit(this.product);
  }

  resetForm() {
    if (this.productForm) {
      this.productForm.reset(this.product);
    }
  }

  cancelForm() {
    this.submittedProduct.emit(undefined);
  }

  private onStatusChanges() {
    if (!this.productForm) {
      return;
    }
    // if (this.pendingSubmit && !this.productForm.pending) {
    //   if (this.productForm.valid) {
    //     this.submitted = true;
    //     this.product = this.productForm.value;
    //   }
    //   this.pendingSubmit = false;
    // }

    const form = this.productForm;

    // tslint:disable-next-line:forin
    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);

      if (control && !control.valid) {
        const messages = this.validationMessages[field];
        // tslint:disable-next-line:forin
        for (const key in control.errors) {
          const error = control.errors[key];
          if (key === 'nameTaken' || key === 'forbiddenName') {
            const message = (messages[key] as string).replace(
              '$',
              error.invalidValue
            );
            this.formErrors[field] += message + ' ';
          } else {
            this.formErrors[field] += messages[key] + ' ';
          }
        }
      }
    }
  }

  formErrors = {
    name: '',
    price: '',
  };

  validationMessages = {
    name: {
      required: 'Name is required.',
      minlength: 'Name must be at least 4 characters long.',
      maxlength: 'Name cannot be more than 24 characters long.',
    },
    price: {
      required: 'Power is required.',
      min: 'Price should be positive number'
    }
  };

}
