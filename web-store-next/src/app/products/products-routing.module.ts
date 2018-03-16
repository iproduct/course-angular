import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductDetailReactiveComponent } from './product-detail-reactive/product-detail-reactive.component';
import { ProductListComponent } from './product-list/product-list.component';
import { CanDeactivateGuard } from '../core/can-deactivate-guard.service';
import { ProductResolver } from './product-resolver';
import { RouteNotFoundComponent } from '../shared/route-not-found/route-not-found.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: ProductListComponent,
        children: [
          {
            path: 'new',
            pathMatch: 'full',
            component: ProductDetailReactiveComponent,
            canDeactivate: [CanDeactivateGuard],
            data: {
              title: 'Add New Product'
            }
          },
          {
            path: ':id',
            component: ProductDetailReactiveComponent,
            canDeactivate: [CanDeactivateGuard],
            data: {
              title: 'Edit Product'
            },
            resolve: {
              product: ProductResolver
            }
          }
          // { path: '**', component: RouteNotFoundComponent }]
      ]}
    ])
  ],
  exports: [
    RouterModule
  ],
  providers: [
    ProductResolver
  ]
})
export class ProductsRoutingModule { }
