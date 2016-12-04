import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Product } from './product.model';
import { ProductService } from './product.service';

@Component({
  // moduleId: module.id,
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  providers: [ProductService]
})
export class ProductListComponent implements OnInit {
  public products: Product[] = [];
  public selectedId: number;

  constructor(
    private service: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location) { }

  public ngOnInit() {
    this.route.params.do(params => console.log(JSON.stringify(params)))
      .forEach((params: Params) => {
      this.selectedId = +params['selectedId'];
      this.fetchProducts();
    });
    // this.route.queryParams.do(params => console.log(JSON.stringify(params)))
    // .forEach((params: Params) => {
    //   this.selectedId = +params['selectedId'];
    //   this.service.getProducts().then(
    //     products => this.products = products
    //   );
    // });
  }

  public selectItem(product: Product) {
    this.selectedId = product.id;
    this.router.navigate(['.', { selectedId: product.id }], { replaceUrl: true })
      .then( isSucces => this.router.navigate(['/product', product.id]) );
  }

  public deleteItem(itemId: number) {
    // // remove deleted user
    // let newUsers = this.state.users.filter((user) => {
    //   return (user.id !== deletedUserId);
    // });
    // this.setState({ users: newUsers });
    this.service.deleteProduct(itemId).then(() => {
      this.fetchProducts();
    });
  }

  private fetchProducts() {
    this.service.getProducts().then(
        products => this.products = products
      );
  }
}
