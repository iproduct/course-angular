import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadingStrategy } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { LoginPageComponent } from './auth/login-page/login-page.component';
import { WikiComponent } from './wiki/wiki.component';
import { RxDemoComponent } from './rxdemo/rx-demo/rx-demo.component';
import { SimpleFormComponent } from './simple-form/simple-form.component';
import { ProductsModule } from './products/products.module';
import { SelectivePreloadingStrategy } from './core/selective-preloading-strategy';
import { AuthGuardService } from './auth/auth-guard.service';
import { Role } from './users/user.model';

export const PRODUCTS_ROUTE = 'products';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: PRODUCTS_ROUTE,
    // canLoad: [AuthGuardService],
    loadChildren: () => import('./products/products.module').then(mod => mod.ProductsModule),
    data: {
      preload: true,
      // rolesAllowed: [Role.CUSTOMER],
    }
  },
  { path: 'login', component: LoginPageComponent },
  { path: 'wiki', component: WikiComponent },
  { path: 'rx-demo', component: RxDemoComponent },
  { path: 'simple-form', component: SimpleFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    enableTracing: true, // <-- debugging purposes only}],
    preloadingStrategy: SelectivePreloadingStrategy
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
