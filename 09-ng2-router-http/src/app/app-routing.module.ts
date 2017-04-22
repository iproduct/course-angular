import { NgModule }     from '@angular/core';
import { RouterModule } from '@angular/router';

import { UserListComponent }    from './users/user-list.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent, pathMatch: 'prefix'  },
      { path: 'products', loadChildren: './products/product.module#ProductModule'},
      { path: 'users', component: UserListComponent },
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
