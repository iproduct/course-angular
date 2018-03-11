import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Product } from '../product.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../product.service';

@Component({
  selector: 'ws-product-detail-reactive',
  templateUrl: './product-detail-reactive.component.html',
  styleUrls: ['./product-detail-reactive.component.css']
})
export class ProductDetailReactiveComponent implements OnInit {
  private _product: Product;

  @Input()
  get product() {
    return this._product;
  }
  set product(value) {
    this._product = value;
    if(!this.product) {
      this.product = new Product(undefined, undefined, undefined);
    }
    this.isNewProduct = !this.product.id;
    this.resetForm();
  }

  @Output() submittedProduct = new EventEmitter<Product>();

  isNewProduct = true;
  productForm: FormGroup;
  errors: string;

  formErrors = {
    name: '',
    price: ''
  };

  private validationMessages = {
    name: {
      required: 'Name is required.',
      minlength: 'Name must be atleast 2 characters long.',
      maxlength: 'Name cannot be more than 24 characters long.'
    },
    price: {
      required: 'Price is required.',
      min: 'Price must be positive.'
    }
  }

  constructor(
    private fb: FormBuilder,
    private service: ProductService
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  onSubmit() {
    this.product = this.productForm.getRawValue() as Product;
    if(this.isNewProduct) {
      this.service.add(this.product).subscribe(product => {
        this.submittedProduct.emit(product);
        this.errors = undefined;
      }, err => {
        this.errors = err;
      });
    } else {
      this.service.update(this.product).subscribe(product => {
        this.submittedProduct.emit(product);
        this.errors = undefined;
      }, err => {
        this.errors = err;
      });
    }
    this.goBack();
  }

  goBack() {
  }

  resetForm() {
    if(this.productForm) {
      this.productForm.reset(this.product);
    }
  }

  private buildForm() {
    this.productForm = this.fb.group({
      id: [{value: this.product.id, disabled: true}],
      name: [ this.product.name,
              [Validators.required, Validators.minLength(2), Validators.maxLength(24)]],
      description: this.product.description,
      price: [ this.product.price,
        [Validators.required, Validators.min(0)]]
    });
    this.productForm.statusChanges.subscribe( () => this.onStatusChanges() );
  }

  private onStatusChanges() {
    if (!this.productForm) { return; }
    const from = this.productForm;

    for (const field in this.formErrors) {
      this.formErrors[field] = '';
      const control = from.get(field);
      if(control && control.dirty && control.invalid) {
        const messages = this.validationMessages[field];
        for(const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

}
