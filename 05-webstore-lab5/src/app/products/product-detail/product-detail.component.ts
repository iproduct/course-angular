import { Component, OnInit, Input, ViewChild, AfterViewChecked } from '@angular/core';
import { Product } from '../product.model';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormControl, NgForm, AbstractControl } from '@angular/forms';
import { formArrayNameProvider } from '@angular/forms/src/directives/reactive_directives/form_group_name';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: AbstractControl | null, form: NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'ws-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit, AfterViewChecked {
  @Input() mode = 'present';
  @Input() product: Product = new Product('', 0, '');
  @ViewChild(NgForm) form: NgForm;
  productForm: NgForm;

  matcher = new MyErrorStateMatcher();

  formErrors = {
    name: ''
  };

  validationMessages = {
    name: {
      required: 'Product name is required.',
      // 'minlength': 'Username must be at least 2 characters long.',
      // 'maxlength': 'Username cannot be more than 24 characters long.'
    }
  };

  constructor() { }

  ngOnInit() {
    if (this.form) {
      this.form.statusChanges
        .subscribe(data => this.onStatusChanged(data));
    }
  }

  ngAfterViewChecked() {
    this.formChanged();
  }

  formChanged() {
    if (this.form === this.productForm) { return; }
    this.productForm = this.form;
    if (this.productForm) {
      this.productForm.statusChanges
        .subscribe((data) => this.onStatusChanged(data));
    }
  }

  private onStatusChanged(data?: any) {
    if (!this.productForm) { return; }
    const form = this.productForm.form;

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
