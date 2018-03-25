import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductListComponent } from './products/product-list/product-list.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { ProductDetailReactiveComponent } from './products/product-detail-reactive/product-detail-reactive.component';
import { ProductResolver } from './products/product-resolver';

const routes: Routes = [
  { path:'', redirectTo: '/products', pathMatch: 'full'},
  { path:'products', component: ProductListComponent, pathMatch: 'full' },
  { path:'products/new', component: ProductDetailReactiveComponent },
  {
    path:'products/:productId',
    component: ProductDetailReactiveComponent,
    resolve: {
      product: ProductResolver
    }
   }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
