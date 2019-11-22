import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { LoginPageComponent } from './auth/login-page/login-page.component';
import { WikiComponent } from './wiki/wiki.component';
import { RxDemoComponent } from './rxdemo/rx-demo/rx-demo.component';
import { SimpleFormComponent } from './simple-form/simple-form.component';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  // { path: 'products', component: ProductListComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'wiki', component: WikiComponent },
  { path: 'rx-demo', component: RxDemoComponent },
  { path: 'simple-form', component: SimpleFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
