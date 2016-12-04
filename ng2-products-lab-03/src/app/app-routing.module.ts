import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './product/product-list.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HomeComponent } from './home/home.component';
import { HomeModule } from './home/home.module';
import { ProductModule } from './product/product.module';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  { path: 'home', component: HomeComponent },
  { path: 'products', component: ProductListComponent },
  { path: '**',  redirectTo: '/home' }
];

@NgModule({
  imports: [
    BrowserModule,
    HomeModule,
    ProductModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}