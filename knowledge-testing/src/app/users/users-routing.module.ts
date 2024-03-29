import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserDetailResolver } from './user-detail-resolver.service';

const USER_ROUTES: Route[] = [
  {
    path: 'users',
    component: UserListComponent,
    children: [
      { path: 'add',
        data: {
          title: 'Add New User'
        },
      component: UserDetailComponent
    },
      { path: ':id',
        data: {
          title: 'Edit User'
        },
        resolve: {
          user: UserDetailResolver
        },
        component: UserDetailComponent}
    ]
  }];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(USER_ROUTES)
  ],
  declarations: [],
  exports: [RouterModule],
  providers: [UserDetailResolver]
})
export class UsersRoutingModule { }
