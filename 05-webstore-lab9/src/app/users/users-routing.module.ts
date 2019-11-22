/*
 * Copyright (c) 2015-2017 IPT-Intellectual Products & Technologies (IPT).
 * All rights reserved.
 *
 * This file is licensed under terms of GNU GENERAL PUBLIC LICENSE Version 3
 * (GPL v3). The full text of GPL v3 license is providded in file named LICENSE,
 * residing in the root folder of this project.
 *
 */

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { UserDetailReactiveComponent } from './user-detail-reactive/user-detail-reactive.component';
import { UserResolver } from './user-resolver';
import { Role } from './user.model';
import { AuthGuardService } from '../auth/auth-guard.service';
import { CanDeactivateGuard } from '../core/can-deactivate-guard.service';


@NgModule({
  imports: [
    RouterModule.forChild([
      // {
      //   path: 'users',
      //   component: UserListComponent,
      //   children: [
      //     {
      //       path: 'create',
      //       component: UserDetailReactiveComponent,
      //       data: {
      //         mode: 'create',
      //         title: 'Add New User'
      //       },
      //     },
      //     {
      //       path: 'present/:userId',
      //       component: UserDetailReactiveComponent,
      //       data: {
      //         mode: 'present',
      //       },
      //       resolve: {
      //         user: UserResolver
      //       }
      //     },
      //     {
      //       path: 'edit/:userId',
      //       component: UserDetailReactiveComponent,
      //       data: {
      //         mode: 'edit',
      //         title: 'Edit User Data'
      //       },
      //       resolve: {
      //         user: UserResolver
      //       }
      //     },
      //   ],
      // }
      {
        path: 'register',
        component: UserDetailReactiveComponent,
        data: {
          title: 'User Registration',
          mode: 'register'
        }
      },
      {
        path: 'users',
        component: UserListComponent,
        // canActivate: [AuthGuardService],
        // canActivateChild: [AuthGuardService],
        // data: {
        //   rolesAllowed: [Role.ADMIN],
        // },
        children: [
          {
            path: 'create',
            pathMatch: 'full',
            component: UserDetailReactiveComponent,
            // canDeactivate: [CanDeactivateGuard],
            data: {
              title: 'Add New User',
              mode: 'create'
            }
          },
          {
            path: 'present/:userId',
            component: UserDetailReactiveComponent,
            data: {
              title: 'User Data',
              mode: 'present'
            },
            // resolve: {
            //   user: UserResolver
            // }
          },
          {
            path: 'edit/:userId',
            component: UserDetailReactiveComponent,
            // canDeactivate: [CanDeactivateGuard],
            data: {
              title: 'Edit User',
              mode: 'edit'
            },
            // resolve: {
            //   user: UserResolver
            // }
          }
        ]
      }
    ])
  ],
  exports: [
    RouterModule
  ],
  // providers: [
  //   UserResolver
  // ]
})
export class UsersRoutingModule { }
