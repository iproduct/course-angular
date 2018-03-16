import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserListComponent } from './user-list.component';
import { UserDetailComponent } from './user-detail.component';
import { AuthGuardService } from '../login/auth-guard.service';
import { CanDeactivateGuard } from '../core/can-deactivate-guard.service';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'users',
        canActivate: [AuthGuardService],
        component: UserListComponent
      },
      {
        path: 'users/new',
        canActivate: [AuthGuardService],
        canDeactivate: [CanDeactivateGuard],
        pathMatch: 'full',
        component: UserDetailComponent,
        data: {
          title: 'Add New User'
        }
      },
      {
        path: 'users/:id',
        component: UserDetailComponent,
        canActivate: [AuthGuardService],
        canDeactivate: [CanDeactivateGuard],
        data: {
          title: 'Edit User'
        }
      }
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class UsersRoutingModule { }
