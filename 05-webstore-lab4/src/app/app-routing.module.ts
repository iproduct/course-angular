import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RouteNotFoundComponent } from './shared/route-not-found/route-not-found.component';
import { HomeComponent } from './home/home.component';
import { SelectivePreloadingStrategy } from './core/selective-preloading-strategy';

@NgModule({
  imports: [
    RouterModule.forRoot([
      {path: '', redirectTo: '/home', pathMatch: 'full'},
      {path: 'home', component: HomeComponent},
      {path: 'products', data: { preload: true }, loadChildren: './products/products.module#ProductsModule'}
    ], {
      enableTracing: true, // <-- debugging purposes only
      preloadingStrategy:  SelectivePreloadingStrategy // or PreloadAllModules
    })
  ],
  declarations: [],
  exports: [RouterModule]
})
export class AppRoutingModule { }
