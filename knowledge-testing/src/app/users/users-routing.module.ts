import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserListComponent } from './user-list/user-list.component';

const USER_ROUTES: Route[] = [
  { path: 'users', component: UserListComponent },
  { path: 'users/add', component: UserDetailComponent},
  { path: 'users/:id', component: UserDetailComponent},
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(USER_ROUTES)
  ],
  declarations: [],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
