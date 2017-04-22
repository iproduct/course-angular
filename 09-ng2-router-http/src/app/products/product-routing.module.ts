import { NgModule }     from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductListComponent } from './product-list.component';
import { ProductDetailComponent } from './product-detail.component';
import { ProductResolver } from './product-resolver';
import { CanDeactivateGuard } from '../common/can-deactivate-guard.service';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'products',  component: ProductListComponent },
       {
        path: 'product/:id',
        component: ProductDetailComponent,
        canDeactivate: [CanDeactivateGuard],
        data: {
          title: 'Edit Product'
        },
        // resolve: {
        //   product: ProductResolver
        // }
      },
      {
        path: 'product',
        pathMatch: 'full',
        component: ProductDetailComponent,
        data: {
          title: 'Add New Product'
        }
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
export class ProductRoutingModule {}
