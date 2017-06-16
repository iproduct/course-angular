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
