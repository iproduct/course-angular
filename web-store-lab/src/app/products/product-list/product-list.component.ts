import { Component, OnInit } from '@angular/core';
import { Product } from '../product.model';
import { IdType } from '../../shared/shared-types';
import { ProductsService } from '../products.service';

@Component({
  selector: 'ws-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  errors: string;
  products: Product[] = [];
  selectedId: IdType;
  selectedProduct: Product;
  constructor(private productService: ProductsService) { }

  ngOnInit() {
    this.productService.findAll().then( products => {
      this.products = products;
    }).catch (errors => {
      this.errors = errors;
    });
  }

  onAddProduct() {

  }

  selectProduct(product: Product) {
    this.selectedId = product.id;
    this.selectedProduct = product;
  }

  deleteItem(id: IdType) {

  }

}
