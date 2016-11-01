import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Product } from './product.model';
import { ProductService } from './product.service';
import { Subscription } from 'rxjs/Rx';
import { OnDestroy } from '@angular/core';

@Component({
  // moduleId: module.id,
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  providers: [ProductService]
})
export class ProductListComponent implements OnInit, OnDestroy {
  public products: Product[] = [];
  public selectedId: number;
  public errorMessage: string;
  private subscription: Subscription;

  constructor(
    private service: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location) { }

  public ngOnInit() {
    // subscribe for product changes
    this.subscription  = this.service.getProductsObservable()
      // .do((ev: Product[]) => console.log(ev))
      .subscribe(
        products => this.products = products,
        error => this.errorMessage = <any> error
      );

    // refresh products
    this.fetchProducts();

    // highlight previously selected product
    this.route.params
      // .do(params => console.log(JSON.stringify(params)))
      .forEach((params: Params) => {
        this.selectedId = +params['selectedId'];
      });
    // this.route.queryParams.do(params => console.log(JSON.stringify(params)))
    // .forEach((params: Params) => {
    //   this.selectedId = +params['selectedId'];
    //   this.service.getProducts().then(
    //     products => this.products = products
    //   );
    // });
  }

  public ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  public selectItem(product: Product) {
    this.selectedId = product.id;
    this.router.navigate(['.', { selectedId: product.id }], { replaceUrl: true })
      .then(isSucces => this.router.navigate(['/product', product.id]));
  }

  public deleteItem(itemId: number) {
    this.service.deleteProduct(itemId);
    // // remove deleted user
    // let newUsers = this.state.users.filter((user) => {
    //   return (user.id !== deletedUserId);
    // });
    // this.setState({ users: newUsers });
    // this.service.deleteProduct(itemId).then(deleted => {
    //   this.fetchProducts();
    // });
  }

  private fetchProducts() {
    this.service.refreshProducts();
  }

}
