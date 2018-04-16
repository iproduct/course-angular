import { Component, OnInit, Input, EventEmitter, Output, OnChanges, SimpleChanges } from '@angular/core';
import { Product } from '../product.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../product.service';
import { ActivatedRoute, Router, Params, CanDeactivate } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Location } from '@angular/common';
import { shallowEquals } from '../../shared/utils';
import { DialogService } from '../../core/dialog.service';
import { CanComponentDeactivate } from '../../core/can-deactivate-guard.service';

@Component({
  selector: 'ws-product-detail-reactive',
  templateUrl: './product-detail-reactive.component.html',
  styleUrls: ['./product-detail-reactive.component.css']
})
export class ProductDetailReactiveComponent implements OnInit,  OnChanges, CanComponentDeactivate {
  private subscription: Subscription;

  @Input() product: Product = new Product(null, null, null);
  @Output() submittedProduct = new EventEmitter<Product>();

  title: string;
  isNewProduct = true;
  productForm: FormGroup;
  errors: string;
  private selectedId;
  private isCanceled = false;

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
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private dialogService: DialogService
  ) { }

  ngOnInit() {
    this.buildForm();
    this.route.params.subscribe((params: Params) => {
      const id = params['id']; // (+) converts string 'id' to a number
      this.selectedId = params['selectedId'];
      if (id) {
        this.isNewProduct = false; // has Id => not new
        // this.subscription = this.service.find(id).subscribe(
        //   product => {
        //     this.product = product;
        //     this.resetForm();
        //   },
        //   err => this.errors = err
        // );
      }
    });
    this.route.data.subscribe(data => {
      console.log('Data:', data);
      this.title = data['title'];
      this.product = data['product'] || this.product; // resolved product using ProductResolver
      this.isNewProduct = !this.product.id;
      this.resetForm();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes.product && changes.product.currentValue !== changes.product.previousValue) {
      if(!changes.product.currentValue) {
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
        this.goBack();
      }, err => {
        this.errors = err;
      });
    } else {
      this.service.update(this.product).subscribe(product => {
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
    if(this.productForm) {
      this.productForm.reset(this.product);
    }
  }

  cancelForm() {
    this.isCanceled = true;
    this.goBack();
  }

  goBack() {
    // let navigationExtras: NavigationExtras = {
    //   queryParams: { selectedId: this.product.id },
    //   fragment: 'anchor'
    // };
    this.router.navigate(['/products', {selectedId: this.selectedId}])
    // this.router.navigate(['/products', {foo: 'bar'}], navigationExtras);
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

  private unsubscribe() {
    if (this.subscription) this.subscription.unsubscribe();
  }

  public canDeactivate(): Promise<boolean> | boolean {
    // Allow navigation if no user or the user data is not changed
    if (this.isCanceled || shallowEquals(this.product, this.productForm.getRawValue())) {
      return true;
    }
    // Otherwise ask the user to confirm loosing changes using the dialog service
    return this.dialogService.confirm('Discard changes?');
  }

}
