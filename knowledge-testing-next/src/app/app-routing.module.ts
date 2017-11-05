/*
 * Copyright (c) 2015-2017 IPT-Intellectual Products & Technologies (IPT).
 * All rights reserved.
 *
 * This file is licensed under terms of GNU GENERAL PUBLIC LICENSE Version 3
 * (GPL v3). The full text of GPL v3 license is providded in file named LICENSE,
 * residing in the root folder of this project.
 *
 */

import { Route, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home/home.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { TestListComponent } from './tests/test-list/test-list.component';
import { Demo01Component } from './reactive-demo/demo01/demo01.component';
import { WikiComponent } from './wiki/wiki.component';
import { RouteNotFoundComponent } from './ui/route-not-found/route-not-found.component';
import { UserDetailComponent } from './users/user-detail/user-detail.component';

const APP_ROUTES: Route[] = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  // {
  //   path: 'users',
  //   component: UserListComponent,
  //   children: [
  //     {
  //       path: 'add',
  //       component: UserDetailComponent,
  //       data: {
  //         title: 'Add New User'
  //       }
  //     },
  //     {
  //       path: ':id',
  //       component: UserDetailComponent,
  //       data: {
  //         title: 'Edit User'
  //       }
  //     }
  //   ]
  // },
  { path: 'tests', component: TestListComponent },
  { path: 'reactive-demo', component: Demo01Component },
  { path: 'wiki-demo', component: WikiComponent },
  { path: '**', component: RouteNotFoundComponent }
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(APP_ROUTES)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
