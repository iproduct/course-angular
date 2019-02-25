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

  constructor(private service: ProductService) { }

  ngOnInit() {
    this.service.find().then(products => this.products = products);
  }

  selectProduct(product) {
    this.selectedProduct = product;
  }

}
