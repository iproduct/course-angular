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
  selectedId: IdType;

  constructor(private service: ProductsService) { }

  ngOnInit() {
    this.service.find().then(products => this.products = products);
  }

  selectProduct(product) {
    this.selectedId = product.id;
  }

}
