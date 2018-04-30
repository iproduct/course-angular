import { Component, OnInit } from '@angular/core';
import { Product } from '../product.model';
import { IdType } from '../../shared/shared-types';
import { ProductsService } from '../products.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'ws-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  errors: string;
  messages: string;
  products: Product[] = [];
  selectedId: IdType;
  selectedProduct: Product;
  newProduct = false;

  constructor(
    private productService: ProductsService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.refresh();
    this.route.params
      .subscribe((params: Params) => this.selectedId = params['selectedId']);
  }

  onAddProduct() {
    this.newProduct = true;
    this.selectedProduct = new Product(undefined, undefined, undefined, undefined);
  }

  selectProduct(productId: IdType) {
    this.selectedId = productId;
    this.newProduct = false;
    this.router.navigate(['products', productId, { selectedId: productId }]);
  }

  deleteItem(id: IdType, event: MouseEvent) {
    event.stopPropagation();
    this.productService.remove(id)
      .subscribe( product => {
        this.messages = `Successfully deleted product '${product.name}.'`;
        setTimeout(() => { this.messages = ''; }, 5000);
        // this.refresh();
        const index = this.products.findIndex(p => p.id === id);
        this.products.splice(index, 1);
      },
      err => {
        this.errors = err;
      });
  }

   private refresh() {
    this.productService.findAll().subscribe( products => {
      this.products = products;
    }, errors => {
      this.errors = errors;
    });

   }

  onSubmittedProduct(product: Product) {
    if (product) {
      if (this.newProduct) {
        this.products.push(product);
      } else {
        const ind = this.products.findIndex(p => p.id === product.id);
        this.products[ind] = product;
      }
    }
    this.selectedProduct = undefined;
  }
}
