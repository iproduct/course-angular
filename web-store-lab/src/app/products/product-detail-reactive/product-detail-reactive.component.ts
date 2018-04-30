/*
 * Copyright (c) 2015-2018 IPT-Intellectual Products & Technologies (IPT).
 * All rights reserved.
 *
 * This software provided by IPT-Intellectual Products & Technologies (IPT)
 * is for non-commercial illustartive and evaluation purposes only.
 * It is NOT SUITABLE FOR PRODUCTION purposes because it is not finished,
 * and may contain security flаws and weaknesses.
 *
 * This file is licensed under terms of GNU GENERAL PUBLIC LICENSE Version 3
 * (GPL v3). The full text of GPL v3 license is providded in file named LICENSE,
 * residing in the root folder of this repository.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * IPT BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
 * ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Product } from '../product.model';
import { ProductsService } from '../products.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { IdType } from '../../shared/shared-types';

@Component({
  selector: 'ws-product-detail-reactive',
  templateUrl: './product-detail-reactive.component.html',
  styleUrls: ['./product-detail-reactive.component.css']
})
export class ProductDetailReactiveComponent implements OnInit, OnChanges {
  @Input() product: Product = new Product(undefined, undefined, undefined, undefined);
  @Output() submittedProduct = new EventEmitter<Product>();

  isNewProduct = true;
  productForm: FormGroup;
  errors: string;
  selectedId: IdType;
  title = 'Add Product';

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
  };

  constructor(
    private productService: ProductsService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.buildForm();
    this.isNewProduct = true;
    this.route.params
      .subscribe((params: Params) => this.selectedId = params['selectedId']);
      // .switchMap((params: Params) => this.productService.find(params['productId']))
      // .subscribe((product: Product) => {
      //   this.product = product;
      //   this.isNewProduct = false;
      //   this.resetForm();
      // });
    this.route.data
    .subscribe(data => {
      this.title = data['title'] || this.title;
      this.product = data['product'] || this.product;
      if (this.product && this.product.id) {
        this.isNewProduct = false;
        this.resetForm();
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.product && changes.product.currentValue !== changes.product.previousValue) {
      if (!this.product) {
        this.product = new Product(undefined, undefined, undefined, undefined);
      }
      this.isNewProduct = !this.product.id;
      this.resetForm();
    }
  }

  resetForm() {
    if (this.productForm) {
      this.productForm.reset(this.product);
    }
  }

  cancelForm() {
    this.submittedProduct.emit(null);
    this.goBack();
  }

  submitForm() {
    this.product = this.productForm.getRawValue();
    if (!this.productForm.valid) {
      return;
    }
    if (this.isNewProduct) {
      this.productService.create(this.product)
      .subscribe( product => {
        this.submittedProduct.emit(product);
        this.errors = undefined;
        this.goBack();
      }, err => {
        this.errors = err;
      });
    } else {
      this.productService.update(this.product)
      .subscribe( product => {
        this.submittedProduct.emit(product);
        this.errors = undefined;
        this.goBack();
      }, err => {
        this.errors = err;
      });
    }
  }

  buildForm(): void {
    this.productForm = this.fb.group({
      id: {value: this.product.id, disabled: true},
      name: [
        this.product.name,
        [Validators.required, Validators.minLength(2), Validators.maxLength(24)]],
      description: this.product.description,
      price: [
        this.product.price,
        [Validators.required, Validators.min(0)]]
    });
  }

  private goBack() {
    this.router.navigate(['/products', {selectedId: this.selectedId}]);
  }

}
