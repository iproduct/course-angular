import { Component, OnInit, HostBinding } from '@angular/core';
import { PRODUCTS } from '../products-mock-data';
import { KeyType } from '../../shared/common-types';
import { Product } from '../product.model';
import { ProductService } from '../product.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { slideInDownAnimation } from '../../shared/animations';

@Component({
  selector: 'ws-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  animations: [ slideInDownAnimation ],
})
export class ProductListComponent implements OnInit {
  @HostBinding('@routeAnimation') routeAnimation = true;
  errors: string;
  products: Product[];
  selectedId: KeyType;
  isNewProduct = false;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.refresh();

    // highlight previously selected product
    this.route.params
      .subscribe((params: Params) => {
        this.refresh();
        this.selectedId = params['selectedId'];
      });
  }

  addProduct() {
    this.isNewProduct = true;
    this.selectedId = undefined;
    this.router.navigate(['products/new']);
  }

  deleteProduct(id: KeyType) {
    this.productService.remove(id)
      .subscribe(
        () => this.refresh(),
        err => this.errors = err
      );
  }

  selectProduct(product: Product) {
    this.isNewProduct = false;
    this.selectedId = product.id;
    this.router.navigate(['products', product.id, { selectedId: product.id }]);
  }

  submitProduct(product: Product) {
    if (!product) {
      this.selectedId = undefined;
      return;
    }
    if (this.isNewProduct) {
      this.products.push(product); // optimistic updates
      this.productService.create(product)
        .subscribe(
          () => this.refresh(),
          err => this.errors = err
        );
    } else {
      this.products.filter(p => p.id  === product.id ? product: p); // optimistic updates
      this.productService.update(product)
        .subscribe(
          () => this.refresh(),
          err => this.errors = err
        );
    }
  }

  refresh() {
    this.productService.findAll()
      .subscribe(
        products => this.products = products,
        err => this.errors = err
      );
  }

}
