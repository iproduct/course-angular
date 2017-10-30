import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HomeModule } from './home/home.module';
import { HomeComponent } from './home/home/home.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { TestListComponent } from './tests/test-list/test-list.component';
import { ReactiveDemoComponent } from './reactive-demo/demo01/demo01.component';
import { WikiComponent } from './wiki/wiki.component';
import { PageNotFoundComponent } from './ui/page-not-found/page-not-found.component';


const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'users', component: UserListComponent },
  { path: 'tests', component: TestListComponent },
  { path: 'reactive-demo', component: ReactiveDemoComponent },
  { path: 'wiki-search', component: WikiComponent },
  { path: '**',  component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
