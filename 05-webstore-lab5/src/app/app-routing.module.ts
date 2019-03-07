import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { RouteNotFoundComponent } from './shared/route-not-found/route-not-found.component';
import { RouterModule } from '@angular/router';

const appRoutes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'products', component: ProductListComponent},
  // {path: 'users', component: UserListComponent},
  // {path: '**', component: RouteNotFoundComponent},
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
