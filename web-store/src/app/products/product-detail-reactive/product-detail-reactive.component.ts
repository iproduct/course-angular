import { Component, OnInit, Input, EventEmitter, Output, OnChanges, SimpleChanges } from '@angular/core';
import { Product } from '../product.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'ws-product-detail-reactive',
  templateUrl: './product-detail-reactive.component.html',
  styleUrls: ['./product-detail-reactive.component.css']
})
export class ProductDetailReactiveComponent implements OnInit, OnChanges {

  @Input() product: Product = new Product(undefined, undefined, undefined);
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
    private service: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {
    this.buildForm();
    this.route.params.subscribe(params => {
      const id = params['productId'];
      if(id) {
        this.isNewProduct = false;
        // this.service.find(id).subscribe(product => {
        //   this.product = product;
        //   this.resetForm();
        // }, err => this.errors = err);
      }
    });
    this.route.data.subscribe(data => {
      console.log(data);
      this.product = data.product || this.product;
      this.isNewProduct = !this.product.id;
      this.resetForm();
    }, err => this.errors = err);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes.product&& changes.product.currentValue !== changes.product.previousValue){
      if(!this.product) {
        this.product = new Product(undefined, undefined, undefined);
      }
      this.isNewProduct = !this.product.id;
      this.resetForm();
    }
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
  }

  resetForm() {
    if(this.productForm) {
      this.productForm.reset(this.product);
    }
  }

  cancelForm() {
    this.router.navigate(['..'], { relativeTo: this.route });
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
