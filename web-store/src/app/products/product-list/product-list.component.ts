import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../product.model';

@Component({
  selector: 'ws-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  selectedProduct: Product;
  errors: string;

  constructor(public productService: ProductService) { }

  ngOnInit() {
    this.productService.findAll().then(products => {
      console.log(products);
      this.products = products;
    }).catch(err => {
      console.log('Error:', err);
      this.errors = err;
    });
  }

  selectProduct(product) {
    this.selectedProduct = product;
  }

}
