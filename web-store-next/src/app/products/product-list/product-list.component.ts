import { Component, OnInit, HostBinding } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../product.model';
import { KeyType } from '../../shared/common-types';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { slideInDownAnimation } from '../../shared/animations';

@Component({
  selector: 'ws-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  animations: [ slideInDownAnimation ]
})
export class ProductListComponent implements OnInit {
  @HostBinding('@routeAnimation') routeAnimation = true;

  products: Product[] = [];
  selectedId: KeyType;
  errors: string;
  newProduct = false;

  constructor(
    public productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.fetchProducts();

    // highlight previously selected product
    this.route.params
      .subscribe((params: Params) => {
        this.fetchProducts();
        this.selectedId = params['selectedId'];
      });
  }

  fetchProducts() {
    this.productService.findAll().subscribe(products => {
      console.log(products);
      this.products = products;
    }, err => {
      console.log('Error:', err);
      this.errors = err;
    });
  }
  selectProduct(product) {
    this.newProduct = false;
    this.selectedId = product.id;
    this.router.navigate(['products', product.id, { selectedId: product.id }]);
  }

  onAddProduct() {
    this.newProduct = true;
    this.selectedId = undefined;
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
    this.productService.remove(id).subscribe(
      item => {
        this.products.splice(this.products.findIndex( it => it.id === item.id), 1 )
      },
      err => {
        this.errors = err;
      });
  }

}
