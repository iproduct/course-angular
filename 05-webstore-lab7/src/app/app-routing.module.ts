import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsListComponent } from './products/products-list/products-list.component';
import { HomeComponent } from './home/home.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { WikiComponent } from './wiki/wiki.component';
import { RxDemoComponent } from './rx-demo/rx-demo/rx-demo.component';
import { SimpleFormComponent } from './simple-form/simple-form.component';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'products', component: ProductsListComponent },
  // { path: 'users', component: UserListComponent },
  { path: 'wiki', component: WikiComponent },
  { path: 'rx-demo', component: RxDemoComponent },
  { path: 'simple-form', component: SimpleFormComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
