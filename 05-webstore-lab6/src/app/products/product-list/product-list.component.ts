import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { Product } from '../product.model';

@Component({
  selector: 'ws-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  selectedProduct: Product;
  isNewProduct = false;
  errors: string;

  constructor(private productService: ProductsService) { }

  ngOnInit() {
    this.productService.findAll().subscribe(
      products => this.products = products,
      error => this.errors = error
    );
  }

  selectProduct(p: Product) {
    this.selectedProduct = p;
    this.isNewProduct = false;
  }

  addProduct() {
    this.selectedProduct = new Product(undefined, undefined, undefined);
    this.isNewProduct = true;
  }

  editProduct(p: Product) {
    if (!p) {
      this.selectedProduct = undefined;
    } else {
      if (this.isNewProduct) {
        this.productService.create(p).subscribe(
          product => this.products.push(product),
          error => this.errors = error
        );
        this.selectedProduct = undefined;
      } else {
        this.productService.update(p).subscribe(
          product => {
            const index = this.products.findIndex(prod => prod.id === product.id);
            this.products[index] = product;
          },
          error => this.errors = error
        );
      }
    }
  }

  deleteProduct(p: Product) {
    this.productService.delete(p.id).subscribe(
      product => {
        const index = this.products.findIndex(prod => prod.id === product.id);
        this.products.splice(index, 1);
      },
      error => this.errors = error
    );
  }

}
