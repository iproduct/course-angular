import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserListComponent } from './components/user-list.component';
import { UserDetailComponent } from './components/user-detail.component';
import { UserResolver } from './user-resolver';
import { CanDeactivateGuard } from '../core/can-deactivate-guard.service';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: UserListComponent,
        children: [
          {
            path: 'new',
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
              user: UserResolver
            }
          }]
      }
    ])
  ],
  exports: [
    RouterModule
  ],
  providers: [
    UserResolver
  ]
})
export class UserRoutingModule { }
