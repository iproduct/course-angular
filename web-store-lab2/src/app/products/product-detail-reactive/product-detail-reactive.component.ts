import { Component, OnInit, Input, EventEmitter, Output, OnChanges, SimpleChanges, HostBinding } from '@angular/core';
import { Product } from '../product.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { KeyType } from '../../shared/common-types';
import { ProductService } from '../product.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { DialogService } from '../../core/dialog.service';
import { CanComponentDeactivate } from '../../core/can-deactivate-guard.service';
import { shallowEquals } from '../../shared/utils';
import { slideInDownAnimation } from '../../shared/animations';

@Component({
  selector: 'ws-product-detail-reactive',
  templateUrl: './product-detail-reactive.component.html',
  styleUrls: ['./product-detail-reactive.component.css'],
  animations: [ slideInDownAnimation ],
})
export class ProductDetailReactiveComponent implements OnInit, OnChanges, 
  CanComponentDeactivate {
    
  @HostBinding('@routeAnimation') routeAnimation = true;
  @Input() product = new Product(null, null, null, null);
  @Output() submittedProduct = new EventEmitter<Product>();

  isNewProduct = true;
  productForm: FormGroup;
  errors: string;
  title: string;
  private selectedId: KeyType;
  isCanceled = false;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private dialogService: DialogService
  ) { }

  ngOnInit() {
    this.buildForm();
    this.isNewProduct = !this.product.id;
    this.resetForm();
    this.route.params.subscribe((params: Params) => {
      const id = params['id'];
      this.selectedId = params['selectedId'];
      this.isNewProduct = !id;
    });
    this.route.data.subscribe(
      data => {
        console.log('Data:', data);
        this.title = data['title'];
        this.product = data['product'] || this.product; // resolved product using ProductResolver
        this.isNewProduct = !this.product.id;
        this.resetForm();
      },
      err => this.errors = err    
    );
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
    // this.submittedProduct.emit(this.product);

    if(this.isNewProduct) {
      this.productService.create(this.product).subscribe(product => {
        this.submittedProduct.emit(product);
        this.errors = undefined;
        this.goBack();
      }, err => {
        this.errors = err;
      });
    } else {
      this.productService.update(this.product).subscribe(product => {
        this.submittedProduct.emit(product);
        this.errors = undefined;
        this.goBack();
      }, err => {
        this.errors = err;
      });
    }
    this.goBack();
  }

  resetForm() {
    if (this.productForm) {
      this.productForm.reset(this.product);
    }
  }

  cancelForm() {
    // this.submittedProduct.emit(undefined);
    this.isCanceled = true;
    this.goBack();
  }

  goBack() {
    this.router.navigate(['/products', {selectedId: this.selectedId}])
  }

  public canDeactivate(): Promise<boolean> | boolean {
    // Allow navigation if no user or the user data is not changed
    if (this.isCanceled || shallowEquals(this.product, this.productForm.getRawValue())) {
      return true;
    }
    // Otherwise ask the user to confirm loosing changes using the dialog service
    return this.dialogService.confirm('Discard changes?');
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
