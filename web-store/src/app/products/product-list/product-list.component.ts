import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../product.model';
import { KeyType } from '../../shared/common-types';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ws-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  selectedId: KeyType;
  errors: string;
  newProduct = false;

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.productService.findAll().subscribe(products => {
      console.log(products);
      this.products = products;
    }, err => {
      console.log('Error:', err);
      this.errors = err;
    });
  }

  selectProduct(id) {
    this.newProduct = false;
    this.selectedId = id;
    this.router.navigate([id], { relativeTo: this.route });
  }

  onAddProduct() {
    this.newProduct = true;
    this.selectedId = undefined;
    this.router.navigate(['products', 'new']);
  }

  onSubmittedProduct(product: Product) {
    if(this.newProduct) {
      this.products.push(product);
    } else {
      const ind = this.products.findIndex(p => p.id === product.id);
      this.products[ind] = product;
    }
    this.selectedId = undefined;
  }

  deleteItem(id: KeyType) {
    this.productService.remove(id).subscribe(product => {
      this.products.splice(this.products.findIndex(p => p.id === product.id), 1);
    }, err => {
      this.errors = err;
    });
  }

}
