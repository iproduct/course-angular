import { Routes } from '@angular/router';
import { UserListComponent } from './users/components/user-list.component';
import { NotFoundComponent } from './ui/components/not-found';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/users',
    pathMatch: 'full' },
  {
    path: 'tests',
    loadChildren: './tests/test.module#TestModule'
  },
  {
    path: 'users',
    loadChildren: './users/user.module#UserModule'
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];
