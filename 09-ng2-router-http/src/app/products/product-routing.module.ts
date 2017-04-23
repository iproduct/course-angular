import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductListComponent } from './product-list.component';
import { ProductDetailComponent } from './product-detail.component';
import { ProductResolver } from './product-resolver';
import { CanDeactivateGuard } from '../common/can-deactivate-guard.service';

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
            component: ProductDetailComponent,
            data: {
              title: 'Add New Product'
            }
          },
          {
            path: ':id',
            component: ProductDetailComponent,
            canDeactivate: [CanDeactivateGuard],
            data: {
              title: 'Edit Product'
            },
            // resolve: {
            //   product: ProductResolver
            // }
          }]
      }
    ])
  ],
  exports: [
    RouterModule
  ],
  providers: [
    ProductResolver
  ]
})
export class ProductRoutingModule { }
