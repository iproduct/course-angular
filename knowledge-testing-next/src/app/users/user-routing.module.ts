import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserDetailResolver } from './user-detail-resolver.service';
import { CanDeactivateGuard } from '../core/can-deactivate-guard.service';
import { AuthGuard } from '../login/auth-guard.service';
import { RouteNotFoundComponent } from '../ui/route-not-found/route-not-found.component';

/*
 * Copyright (c) 2015-2017 IPT-Intellectual Products & Technologies (IPT).
 * All rights reserved.
 *
 * This file is licensed under terms of GNU GENERAL PUBLIC LICENSE Version 3
 * (GPL v3). The full text of GPL v3 license is providded in file named LICENSE,
 * residing in the root folder of this project.
 *
 */

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
          }],
      },
      { path: '**', component: RouteNotFoundComponent }
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
