import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsListComponent } from './products/products-list/products-list.component';
import { RxDemoComponent } from './rx-demo/rx-demo/rx-demo.component';
import { WikiComponent } from './wiki/wiki.component';


const routes: Routes = [
  {path: '', redirectTo: '/products', pathMatch: 'full'},
  {path: 'products', component: ProductsListComponent},
  {path: 'rxdemo', component: RxDemoComponent},
  {path: 'wiki', component: WikiComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
