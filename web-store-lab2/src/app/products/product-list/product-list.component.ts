import { Component, OnInit } from '@angular/core';
import { PRODUCTS } from '../products-mock-data';
import { KeyType } from '../../shared/common-types';
import { Product } from '../product.model';

@Component({
  selector: 'ws-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  errors: string;
  products = PRODUCTS;
  selected: Product;

  constructor() { }

  ngOnInit() {
  }

  addProduct() {

  }

  selectProduct(product: Product) {
    this.selected = product;
  }
}
