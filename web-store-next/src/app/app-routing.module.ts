import { NgModule } from "@angular/core";
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { UserListComponent } from './users/user-list.component';
import { SalesTaxComponent } from './sales/sales-tax.component';
import { SimpleFormComponent } from './small-demos/simple.form.component';

@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent, pathMatch: 'prefix'},
      // { path: 'users', component: UserListComponent},
      { path: 'sales', component: SalesTaxComponent},
      { path: 'small-demos', component: SimpleFormComponent},
      // { path: 'products', component: ProductListComponent},
      { path: 'products', loadChildren: './products/products.module#ProductsModule'}
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
