import { Component, Input, OnInit, OnChanges, SimpleChange } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params, NavigationExtras } from '@angular/router';
import { Product } from './product.model';
import { ProductService } from './product.service';

@Component({
  // moduleId: module.id,
  selector: 'product-detail',
  templateUrl: './product-detail.component.html'
})
export class ProductDetailComponent implements OnInit, OnChanges {
  @Input()
  public product: Product = { id: undefined };
  public productForm: FormGroup;
  public isNewProduct: boolean; // ADD: true, EDIT: false


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
    private service: ProductService) { }

  public ngOnInit() {
    this.buildForm();
    this.route.params.forEach((params: Params) => {
      let id = +params['id']; // (+) converts string 'id' to a number
      this.isNewProduct = true; // new
      if (id) {
        this.isNewProduct = false; // has Id => not new
        this.service.getProduct(id).then(
          product => {
            this.product = product;
            this.resetForm();
          });
      }
    });
    this.route.data.do(data => console.log(JSON.stringify(data)))
      .forEach((params: Params) => {});
  }

  public ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
    let chng = changes['product'];
    if (chng.currentValue !== chng.previousValue) {
      this.resetForm();
    }
  }

  public buildForm(): void {
    this.isNewProduct = !this.product.id; // if product doesn't have ID => it is a new product 
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
       this.service.addProduct(this.product).then(product => {
         this.product = product;
         this.gotoProducts();
       });
    } else {
       this.service.editProduct(this.product).then(product => {
         this.product = product;
         this.gotoProducts();
       });
    }
  }

  public gotoProducts() {
    let navigationExtras: NavigationExtras = {
      queryParams: { selectedId: this.product.id },
      fragment: 'anchor'
    };
    this.router.navigate(['/products', {foo: 'bar'}], navigationExtras);
  }

  public resetForm() {
    this.productForm.reset(this.product);
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

