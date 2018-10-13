import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges, HostBinding } from '@angular/core';
import { Product } from '../product.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoggerService } from '../../core/logger.service';
import { slideInDownAnimation } from '../../shared/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, filter } from 'rxjs/operators';
import { ProductsService } from '../products.service';
import { Location } from '@angular/common';

@Component({
  selector: 'ws-product-detail-reactive',
  templateUrl: './product-detail-reactive.component.html',
  styleUrls: ['./product-detail-reactive.component.css'],
  animations: [ slideInDownAnimation ]
})
export class ProductDetailReactiveComponent implements OnInit, OnChanges {
  @Input() product: Product = new Product(undefined, undefined);
  @Output() productChange = new EventEmitter<Product>();
  @HostBinding('@routeAnimation') routeAnimation = true;
  form: FormGroup;
  errors: string;

  constructor(
    private logger: LoggerService,
    private fb: FormBuilder,
    private service: ProductsService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
    ) { }

  ngOnInit() {
    this.route.params.pipe(
      filter(params => {
        if (!!params['productId']) {
          return true;
        } else {
          this.product = new Product(undefined, undefined);
          return false;
        }
      }),
      switchMap(params => {
        return this.service.findById(params['productId']);
      })
    ).subscribe(
      product => {
        this.product = product;
        this.resetForm();
        this.errors = undefined;
      },
      error => this.errors = error
    );
    this.buildForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.product && changes.product.previousValue !== changes.product.currentValue) {
      this.resetForm();
    }
  }

  buildForm() {
    this.form = this.fb.group({
      id: {value: this.product.id, disabled: true},
      name: [
        this.product.name,
        [Validators.required, Validators.minLength(2), Validators.maxLength(24)]
      ],
      price: [
        this.product.price,
        [Validators.required, Validators.min(0), Validators.pattern('^\\d+\\.?\\d{0,2}$')]
      ],
      description: this.product.description
    });
    this.form.statusChanges.subscribe(
      () => {
        this.onStatusChanges();
      }
    );
  }

  onStatusChanges() {
    if (!this.form) {
      return;
    }

    const form = this.form;

    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);

      if (control && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          const error = control.errors[key];
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  submitForm() {
    this.logger.log(this.form.getRawValue());
    this.logger.log(this.form.valid);
    this.productChange.emit(this.form.getRawValue());
    if (this.form.getRawValue().id) {
      this.service.edit(this.form.getRawValue())
      .subscribe(
        product => {
          this.product = product;
          this.router.navigate(['..'], { relativeTo: this.route });
        },
        error => this.errors = error
      );
    } else {
      this.service.add(this.form.getRawValue())
      .subscribe(
        product => {
          this.product = product;
          this.router.navigate(['..'], { relativeTo: this.route });
        },
        error => this.errors = error
      );
    }
  }

  resetForm() {
    if  (this.form) {
      this.form.reset(this.product);
    }
  }

  cancelForm() {
    this.productChange.emit(null);
    this.goBack();
    return false;
  }

  goBack() {
    this.location.back();
  }

  formErrors = {
    name: '',
    price: ''
  };

  validationMessages = {
    name: {
      required: 'Name is required.',
      minlength: 'Name must be at least 2 characters long.',
      maxlength: 'Name cannot be more than 24 characters long.'
    },
    price: {
      required: 'Price is required.',
      min: 'The number should be non-negative.',
      pattern: 'Should be a real number with at most two fraction digits. Ex.: 42.17'
    }
  };
}
