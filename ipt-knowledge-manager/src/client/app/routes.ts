import { Routes } from '@angular/router';

import { BookExistsGuard } from './guards/book-exists';
import { FindBookPageComponent } from './containers/find-book-page';
import { ViewBookPageComponent } from './containers/view-book-page';
import { CollectionPageComponent } from './containers/collection-page';
import { NotFoundPageComponent } from './containers/not-found-page';
import { UserListComponent } from './users/components/user-list.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/collection',
    pathMatch: 'full' },
  {
    path: 'collection',
    component: CollectionPageComponent
  },
  {
    path: 'tests',
    loadChildren: './tests/test.module#TestModule'
  },
  {
    path: 'users',
    loadChildren: './users/user.module#UserModule'
  },
  {
    path: 'book/find',
    component: FindBookPageComponent
  },
  {
    path: 'book/:id',
    canActivate: [ BookExistsGuard ],
    component: ViewBookPageComponent
  },
  {
    path: '**',
    component: NotFoundPageComponent
  }
];
