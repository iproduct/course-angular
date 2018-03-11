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
  newProduct = false;

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
    this.newProduct = false;
    this.selectedProduct = product;
  }

  onAddProduct() {
    this.newProduct = true;
    this.selectedProduct = new Product(undefined, undefined, undefined);
  }

  onSubmittedProduct(product: Product) {
    if(this.newProduct) {
      this.products.push(product);
    } else {
      const ind = this.products.findIndex(p => p.id === product.id);
      this.products[ind] = product;
    }
    this.selectedProduct = undefined;
  }

}
