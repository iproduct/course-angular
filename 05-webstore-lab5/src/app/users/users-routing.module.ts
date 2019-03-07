import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { UserDetailReactiveComponent } from './user-detail-reactive/user-detail-reactive.component';

const appRoutes = [
  {
    path: 'users',
    component: UserListComponent,
    children: [
      {
        path: 'create',
        component: UserDetailReactiveComponent,
        data: {
          title: 'Add New User',
          mode: 'create'
        }
      },
      {
        path: 'present/:userId',
        component: UserDetailReactiveComponent,
        data: {
          title: 'User Details',
          mode: 'present'
        }
      },
      {
        path: 'edit/:userId',
        component: UserDetailReactiveComponent,
        data: {
          title: 'Edit User Details',
          mode: 'edit'
        }
      }
    ]
    },
  ];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(appRoutes),
  ],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
