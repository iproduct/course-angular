/*
 * Copyright (c) 2015-2018 IPT-Intellectual Products & Technologies (IPT).
 * All rights reserved.
 * 
 * This software provided by IPT-Intellectual Products & Technologies (IPT) is for 
 * non-commercial illustartive and evaluation purposes only. 
 * It is NOT SUITABLE FOR PRODUCTION purposes because it is not finished,
 * and contains security flаws and weaknesses (like sending the passwords and 
 * emails of users to the browser client, wich YOU SHOULD NEVER DO with real user
 * data). You should NEVER USE THIS SOFTWARE with real user data.
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

import { Component, OnInit, HostBinding } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../product.model';
import { KeyType } from '../../shared/common-types';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { slideInDownAnimation } from '../../shared/animations';

@Component({
  selector: 'ws-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  animations: [ slideInDownAnimation ]
})
export class ProductListComponent implements OnInit {
  @HostBinding('@routeAnimation') routeAnimation = true;

  products: Product[] = [];
  selectedId: KeyType;
  errors: string;
  newProduct = false;

  constructor(
    public productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.fetchProducts();

    // highlight previously selected product
    this.route.params
      .subscribe((params: Params) => {
        this.fetchProducts();
        this.selectedId = params['selectedId'];
      });
  }

  fetchProducts() {
    this.productService.findAll().subscribe(products => {
      console.log(products);
      this.products = products;
    }, err => {
      console.log('Error:', err);
      this.errors = err;
    });
  }
  selectProduct(product) {
    this.newProduct = false;
    this.selectedId = product.id;
    this.router.navigate(['products', product.id, { selectedId: product.id }]);
  }

  onAddProduct() {
    this.newProduct = true;
    this.selectedId = undefined;
  }

  onSubmittedProduct(product: Product) {
    if(this.newProduct) {
      this.products.push(product);
    } else {
      const ind = this.products.findIndex(p => p.id === product.id);
      this.products[ind] = product;
    }
    this.selectedId = undefined;
  }

  deleteItem(id: KeyType) {
    this.productService.remove(id).subscribe(
      item => {
        this.products.splice(this.products.findIndex( it => it.id === item.id), 1 )
      },
      err => {
        this.errors = err;
      });
  }

}
