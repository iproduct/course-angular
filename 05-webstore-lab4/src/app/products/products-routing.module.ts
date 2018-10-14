import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductDetailReactiveComponent } from './product-detail-reactive/product-detail-reactive.component';
import { RouteNotFoundComponent } from '../shared/route-not-found/route-not-found.component';
import { ProductResolver } from './product-resolver';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: ProductsListComponent,
        children: [
          {path: 'new', component: ProductDetailReactiveComponent},
          {
            path: ':productId',
            component: ProductDetailReactiveComponent,
            resolve: { product: ProductResolver }
          }
        ]
      },
    ])
  ],
  exports: [ RouterModule ],
  declarations: [],
  providers: [ ProductResolver ]
})
export class ProductsRoutingModule { }
