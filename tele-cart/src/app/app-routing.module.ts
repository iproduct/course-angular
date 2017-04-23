import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { UserListComponent } from './users/user-list.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { SalesTaxComponent } from './sales/sales-tax.component';

@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: '', redirectTo: '/products', pathMatch: 'full' },
      { path: 'products', component: ProductListComponent },
      { path: 'users', component: UserListComponent },
      { path: 'calculator', component: SalesTaxComponent },
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
