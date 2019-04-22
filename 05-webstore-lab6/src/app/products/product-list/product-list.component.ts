import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { Product } from '../product.model';

@Component({
  selector: 'ws-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  selectedProduct: Product;
  isNewProduct = false;

  constructor(private productService: ProductsService) { }

  ngOnInit() {
    this.productService.findAll().then(products => this.products = products);
  }

  selectProduct(p: Product) {
    this.selectedProduct = p;
  }

  addProduct() {
    this.selectedProduct = new Product(undefined, undefined);
    this.isNewProduct = true;
  }

}
