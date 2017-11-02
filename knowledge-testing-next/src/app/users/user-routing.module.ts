import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserDetailResolver } from './user-detail-resolver.service';
import { CanDeactivateGuard } from '../core/can-deactivate-guard.service';
import { AuthGuard } from '../login/auth-guard.service';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'users',
        component: UserListComponent,
        canActivate: [AuthGuard],
        children: [
          {
            path: 'add',
            canActivateChild: [AuthGuard],
            pathMatch: 'full',
            component: UserDetailComponent,
            data: {
              title: 'Add New User'
            }
          },
          {
            path: ':id',
            component: UserDetailComponent,
            canDeactivate: [CanDeactivateGuard],
            data: {
              title: 'Edit User'
            },
            resolve: {
              user: UserDetailResolver
            }
          }]
      }
    ])
  ],
  exports: [
    RouterModule
  ],
  providers: [
    UserDetailResolver
  ]
})
export class UserRoutingModule {}
