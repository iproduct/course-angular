/*
 * Copyright (c) 2015-2017 IPT-Intellectual Products & Technologies (IPT).
 * All rights reserved.
 *
 * This file is licensed under terms of GNU GENERAL PUBLIC LICENSE Version 3
 * (GPL v3). The full text of GPL v3 license is providded in file named LICENSE,
 * residing in the root folder of this project.
 *
 */

import { Routes } from '@angular/router';
import { UserListComponent } from './users/components/user-list.component';
import { NotFoundComponent } from './ui/components/not-found';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/users',
    pathMatch: 'full' },
  {
    path: 'tests',
    loadChildren: './tests/test.module#TestModule'
  },
  {
    path: 'users',
    loadChildren: './users/user.module#UserModule'
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];
