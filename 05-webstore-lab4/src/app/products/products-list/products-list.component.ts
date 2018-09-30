import { Component, OnInit } from '@angular/core';
import { Product } from '../product.model';
import { ProductsService } from '../products.service';
import { IdType } from '../../shared/shared-types';

@Component({
  selector: 'ws-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {
  products: Product[] = [];
  selected: Product;

  constructor(private service: ProductsService) { }

  ngOnInit() {
    this.service.find().then(products => this.products = products);
  }

  selectProduct(product) {
    this.selected = product;
  }

  editProduct(product: Product) {
    if (product) {
      this.service.edit(product);
    } else {
      this.selected = undefined;
    }
  }

}
