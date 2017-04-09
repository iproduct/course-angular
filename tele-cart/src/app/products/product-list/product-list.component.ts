import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { Product } from './product.model';

@Component({
  selector: 'tc-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  public products: Product[];
  public selectedProduct: Product;

  constructor(private service: ProductsService) { }

  ngOnInit() {
    this.products = this.service.getProducts();
  }

  trackById(product) {
    return product.id;
  }

  selectProduct(product) {
    this.selectedProduct = product;
  }

  productChanged(product: Product) {
    const pInd = this.products.findIndex(prod => prod.id === product.id);
    this.products[pInd] = product;
    this.selectedProduct = undefined;
  }

  productCanceled() {
    this.selectedProduct = undefined;
  }

}
