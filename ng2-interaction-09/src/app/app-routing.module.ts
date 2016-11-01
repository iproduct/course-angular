import { NgModule }     from '@angular/core';
import { RouterModule } from '@angular/router';
import { WikiComponent } from './wiki/wiki.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'wiki', component: WikiComponent },
      // { path: 'products', component: ProductListComponent },
      // { path: 'users', component: UserListComponent }
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
