import { Component, OnInit } from '@angular/core';
import { Product } from './product.model';
import { ProductService } from './product.service';

@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  public products: Product[];
  public selectedProduct: Product;

  constructor(private service: ProductService) {}

  public ngOnInit() {
    this.service.getProducts().then(products => this.products = products);
  }

  public selectProduct(product: Product): void {
    this.selectedProduct = product;
    console.log(`Product selected: ${JSON.stringify(product)}`);
  }

}
