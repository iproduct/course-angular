import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Product } from '../product.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ws-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit, OnChanges {

  @Input() mode = 'present';
  @Input() product: Product;
  @Output() productModified = new EventEmitter<Product>();
  @Output() productCanceled = new EventEmitter<Product>();
  form: FormGroup;
  private statusSubscription: Subscription;

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
    const prodChange = changes.product;
    if (prodChange.currentValue !== prodChange.previousValue) {
      this.reset();
    }
  }

  buildForm() {
    this.form = this.fb.group({
      id: {value: this.product.id, disabled: true},
      name: [this.product.name,
        [Validators.required, Validators.minLength(2), Validators.maxLength(24)]
      ],
      price: [this.product.price,
        [Validators.required, Validators.min(0)]
      ],
      description: [this.product.description,
        [Validators.required, Validators.minLength(2), Validators.maxLength(512)]
      ],
      imageUrl: [this.product.imageUrl,
        [
          Validators.pattern(/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/i)
        ]
      ]
    });
  }

  submitProduct() {

  }

  reset() {
    if (this.product) {
      this.form.reset(this.product);
    }
  }
  cancelProduct() {

  }


}
