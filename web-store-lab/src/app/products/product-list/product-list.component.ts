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

import { Component, OnInit } from '@angular/core';
import { Product } from '../product.model';
import { IdType } from '../../shared/shared-types';
import { ProductsService } from '../products.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'ws-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  errors: string;
  messages: string;
  products: Product[] = [];
  selectedId: IdType;
  selectedProduct: Product;
  newProduct = false;

  constructor(
    private productService: ProductsService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.refresh();
    this.route.params
      .subscribe((params: Params) => this.selectedId = params['selectedId']);
  }

  onAddProduct() {
    this.newProduct = true;
    this.selectedProduct = new Product(undefined, undefined, undefined, undefined);
  }

  selectProduct(productId: IdType) {
    this.selectedId = productId;
    this.newProduct = false;
    this.router.navigate(['products', productId, { selectedId: productId }]);
  }

  deleteItem(id: IdType, event: MouseEvent) {
    event.stopPropagation();
    this.productService.remove(id)
      .subscribe( product => {
        this.messages = `Successfully deleted product '${product.name}.'`;
        setTimeout(() => { this.messages = ''; }, 5000);
        // this.refresh();
        const index = this.products.findIndex(p => p.id === id);
        this.products.splice(index, 1);
      },
      err => {
        this.errors = err;
      });
  }

   private refresh() {
    this.productService.findAll().subscribe( products => {
      this.products = products;
    }, errors => {
      this.errors = errors;
    });

   }

  onSubmittedProduct(product: Product) {
    if (product) {
      if (this.newProduct) {
        this.products.push(product);
      } else {
        const ind = this.products.findIndex(p => p.id === product.id);
        this.products[ind] = product;
      }
    }
    this.selectedProduct = undefined;
  }
}
