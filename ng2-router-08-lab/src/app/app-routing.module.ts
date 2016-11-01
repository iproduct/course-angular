import { NgModule }     from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProductListComponent }  from './products/product-list.component';
import { UserListComponent }    from './users/user-list.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'products', component: ProductListComponent },
      { path: 'users', component: UserListComponent }
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
