import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductsListComponent } from './products/products-list/products-list.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { RouteNotFoundComponent } from './shared/route-not-found/route-not-found.component';
import { HomeComponent } from './home/home.component';
import { ProductDetailReactiveComponent } from './products/product-detail-reactive/product-detail-reactive.component';

@NgModule({
  imports: [
    RouterModule.forRoot([
      {path: '', redirectTo: '/home', pathMatch: 'full'},
      {path: 'home', component: HomeComponent},
      {path: 'products', component: ProductsListComponent},
      {path: 'products/new', component: ProductDetailReactiveComponent},
      {path: 'products/:productId', component: ProductDetailReactiveComponent},
      {path: '**', component: RouteNotFoundComponent}
    ])
  ],
  declarations: [],
  exports: [RouterModule]
})
export class AppRoutingModule { }
