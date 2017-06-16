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
import { TestListComponent } from './components/test-list.component';
import { TestDetailComponent } from './components/test-detail.component';
import { TestResolver } from './test-resolver';
import { CanDeactivateGuard } from '../core/can-deactivate-guard.service';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: TestListComponent,
        children: [
          {
            path: 'new',
            pathMatch: 'full',
            component: TestDetailComponent,
            data: {
              title: 'Add New Test'
            }
          },
          {
            path: ':id',
            component: TestDetailComponent,
            // canDeactivate: [CanDeactivateGuard],
            data: {
              title: 'Edit Test'
            },
            resolve: {
              test: TestResolver
            }
          }]
      }
    ])
  ],
  exports: [
    RouterModule
  ],
  providers: [
    TestResolver
  ]
})
export class TestRoutingModule { }
