import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { Product } from '../product.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from '../../core/message.service';

@Component({
  selector: 'ws-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit, OnDestroy, OnChanges {
  @Input() mode = 'present';
  @Input() product: Product = new Product(undefined, undefined);
  @Output() productModified = new EventEmitter<Product>();
  @Output() productCanceled = new EventEmitter<void>();
  title = 'Product Details';
  get isNewProduct() {
    return this.product && this.product.id;
  }
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
      minlength: 'Productname must be at least 2 characters long.',
      maxlength: 'Productname cannot be more than 24 characters long.'
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

  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute,
              private messageService: MessageService) { }

  ngOnInit() {
    this.route.data
    .subscribe(
      (data: { product?: Product, title?: string, mode?: string }) => {
        this.title = data.title || this.title;
        this.mode = data.mode || this.mode;
        const product = data.product;
        if (product) {
          this.product = product;
          this.reset();
        }
      },
      err => this.messageService.error(err)
    );
    this.buildForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const prodChange = changes.product;
    if (prodChange && prodChange.currentValue !== prodChange.previousValue) {
      this.reset();
    }
  }

  ngOnDestroy(): void {
    if (this.statusSubscription) {
      this.statusSubscription.unsubscribe();
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
    this.statusSubscription = this.form.statusChanges.subscribe(() => this.onStatusChanged());
  }

  submitProduct() {
    this.product = this.form.getRawValue();
    this.productModified.emit(this.product);
    this.reset();
  }

  reset() {
    if ( this.form && this.product) {
      this.form.reset(this.product);
    }
  }
  cancelProduct() {
    this.productCanceled.emit();
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
