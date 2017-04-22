import { Component, Input, OnInit, OnChanges, SimpleChange, HostBinding } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params, NavigationExtras } from '@angular/router';
import { Product } from './product.model';
import { ProductService } from './product.service';
import { Subscription } from 'rxjs/Rx';
import { slideInDownAnimation } from '../common/animations';
import { CanComponentDeactivate } from '../common/can-deactivate-guard.service';
import { DialogService } from '../common/dialog.service';
import { shallowEquals } from '../common/utils';

@Component({
  // moduleId: module.id,
  selector: 'product-detail',
  templateUrl: './product-detail.component.html',
  animations: [ slideInDownAnimation ]
})
export class ProductDetailComponent implements OnInit, OnChanges, CanComponentDeactivate {
  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display')   display = 'block';
  @HostBinding('style.width')   width = '100%';
  @HostBinding('style.position')  position = 'absolute';

  public product: Product = { id: undefined };
  public productForm: FormGroup;
  public isNewProduct: boolean = true; // new product by default
  public errorMessage: string;
  private subscription: Subscription;

  private formErrors = {
    'name': '',
    'price': ''
  };

  private validationMessages = {
    'name': {
      'required': 'Name is required.',
      'minlength': 'Name must be at least 2 characters long.',
      'maxlength': 'Name cannot be more than 40 characters long.'
    },
    'price': {
      'required': 'Price is required.',
      'pattern': 'Price should be a positive number.'
    }
  };

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private service: ProductService,
    private dialogService: DialogService) { }

  public ngOnInit() {
    this.service.refreshProducts();
    this.buildForm();
    this.route.params.forEach((params: Params) => {
      let id = +params['id']; // (+) converts string 'id' to a number
      if (id) {
        this.isNewProduct = false; // has Id => not new
        this.unsubscribe();
        this.subscription = this.service.getProductObservable(id).subscribe(
          product => {
            this.product = product;
            this.resetForm();
          },
          error => this.errorMessage = <any> error
        );
        //     this.service.getProduct(id).then(
        //       product => {
        //         this.product = product;
        //         this.resetForm();
        // });
      }
    });
    // this.route.data.forEach(data => {
    //   console.log('Data:', data);
    //   this.product = data['product'] || this.product; // resolved product using ProductResolver
    //   this.isNewProduct = !this.product.id;
    //   this.resetForm();
    // });
  }

  public ngOnDestroy() {
    this.unsubscribe();
  }

  public ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
    let chng = changes['product'];
    if (chng.currentValue !== chng.previousValue) {
      this.resetForm();
    }
  }

  canDeactivate(): Promise<boolean> | boolean {
    // Allow synchronous navigation (`true`) if no crisis or the crisis is unchanged
    if ( shallowEquals(this.product, this.productForm.getRawValue() as Product) ) {
      return true;
    }
    // Otherwise ask the user with the dialog service and return its
    // promise which resolves to true or false when the user decides
    return this.dialogService.confirm('Discard changes?');
  }

  public buildForm(): void {
    this.productForm = this.fb.group({
      'id': [{ value: this.product.id, disabled: true }],
      'name': [this.product.name, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(24)
      ]],
      'description': [this.product.description],
      'price': [this.product.price, [
        Validators.required,
        Validators.pattern('^[0-9]+\.?[0-9]*$')
      ]]
    });

    this.productForm.statusChanges
      .subscribe(data => this.onStatusChanged(data));

    this.onStatusChanged(); // reset validation messages
  }

  public onSubmit() {
    this.product = this.productForm.getRawValue() as Product;
    if (this.isNewProduct) {
      this.service.addProduct(this.product);
      this.goBack();
      //  this.service.addProduct(this.product).then(product => {
      //    this.product = product;
      //    this.goBack();
      //  });
    } else {
      this.service.editProduct(this.product);
      this.goBack();
      //  this.service.editProduct(this.product).then(product => {
      //    this.product = product;
      //    this.goBack();
      //  });
    }
  }

  public goBack() {
    // let navigationExtras: NavigationExtras = {
    //   queryParams: { selectedId: this.product.id },
    //   fragment: 'anchor'
    // };
    this.location.back();
    // this.router.navigate(['/products', {foo: 'bar'}], navigationExtras);
  }

  public resetForm() {
    this.productForm.reset(this.product);
  }

  private unsubscribe() {
    if (this.subscription) this.subscription.unsubscribe();
  }

  private onStatusChanged(data?: any) {
    if (!this.productForm) { return; }
    const form = this.productForm;

    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);

      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

}

