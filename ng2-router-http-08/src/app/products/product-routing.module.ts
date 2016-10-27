import { NgModule }     from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductListComponent } from './product-list.component';
import { ProductDetailComponent } from './product-detail.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'products',  component: ProductListComponent },
      {
        path: 'product',
        pathMatch: 'full',
        component: ProductDetailComponent,
        data: {
          title: 'Add New Product'
        }
      },
      {
        path: 'product/:id',
        component: ProductDetailComponent,
        data: {
          title: 'Edit Product'
        }
       }
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class ProductRoutingModule {}
