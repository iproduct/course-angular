import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './product/product-list.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HomeComponent } from './home/home.component';
import { HomeModule } from './home/home.module';
import { ProductModule } from './product/product.module';
import { UserListComponent } from './users/user-list.component';
import { UserModule } from './users/users.module';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  { path: 'home', component: HomeComponent },
  { path: 'products', component: ProductListComponent },
  { path: 'useers', component: UserListComponent },
  { path: '**',  redirectTo: '/home' }
];

@NgModule({
  imports: [
    BrowserModule,
    HomeModule,
    ProductModule,
    UserModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}