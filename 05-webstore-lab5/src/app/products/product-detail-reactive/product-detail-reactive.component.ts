  import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
  import { Product } from '../product.model';
  import { FormBuilder, FormGroup, Validators } from '@angular/forms';

  @Component({
    selector: 'ws-product-detail-reactive',
    templateUrl: './product-detail-reactive.component.html',
    styleUrls: ['./product-detail-reactive.component.css']
  })
  export class ProductDetailReactiveComponent implements OnInit, OnChanges {
    @Input() mode = 'present';
    @Input() product: Product = new Product('', 0, '');
    @Output() productChange = new EventEmitter<Product>();

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
        required: 'Price is required.'
      },
      description: {
        required: 'Description is required.'
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
      if (changes.product && changes.product.currentValue !== changes.product.previousValue) {
        this.resetProduct();
      }
    }

    buildForm(): void {
      this.productForm = this.fb.group({
        id: {value: this.product.price, disabled: true},
        name: [
          this.product.name,
          [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(24)
          ]
        ],
        price: [
          this.product.price,
        ],
        description: [
          this.product.description,
          Validators.required
        ],
        imageUrl: [
          this.product.imageUrl,
          [
            Validators.pattern(/^(?:http(s)?:\/\/)[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/gm)
          ]
        ],
      });
      this.productForm.statusChanges.subscribe( () => this.onStatusChanged() );
    }

    resetProduct() {
      if (this.productForm) {
        this.productForm.reset(this.product);
      }
    }

    submitProduct() {
      this.product = this.productForm.getRawValue();
      this.productChange.emit(this.product);
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


  }
