import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeModule } from './home/home.module';
import { HomeComponent } from './home/home.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { UserListComponent } from './users/user-list.component';
import { RouteNotFoundComponent } from './shared/route-not-found/route-not-found.component';
import { UserDetailComponent } from './users/user-detail.component';
import { AuthGuardService } from './login/auth-guard.service';

const routes: Routes = [
  { path:'', redirectTo:'/home', pathMatch:'full' },
  { path:'home', component: HomeComponent },
  { path:'products', loadChildren: './products/products.module#ProductsModule' },
  { 
    path:'users', 
    canLoad: [AuthGuardService],
    loadChildren: './users/users.module#UsersModule' 
  }
  // { path: '**', component: RouteNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
