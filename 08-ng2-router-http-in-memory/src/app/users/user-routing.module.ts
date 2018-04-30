import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserListComponent } from './user-list.component';
import { UserDetailComponent } from './user-detail.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'users',
        component: UserListComponent
      },
      {
        path: 'users/new',
        pathMatch: 'full',
        component: UserDetailComponent,
        data: {
          title: 'Add New User'
        }
      },
      {
        path: 'users/:id',
        component: UserDetailComponent,
        data: {
          title: 'Edit User'
        }
      },
      {
        path: '**', redirectTo: '/home'
      },
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class UserRoutingModule { }
