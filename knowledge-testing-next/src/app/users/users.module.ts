/*
 * Copyright (c) 2015-2017 IPT-Intellectual Products & Technologies (IPT).
 * All rights reserved.
 *
 * This file is licensed under terms of GNU GENERAL PUBLIC LICENSE Version 3
 * (GPL v3). The full text of GPL v3 license is providded in file named LICENSE,
 * residing in the root folder of this project.
 *
 */

import {MatInputModule, MatSelectModule, MatButtonModule, MatListModule, MatIconModule} from '@angular/material';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './user-list/user-list.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserService } from './user.service';
import { SimpleReactiveComponent } from './simple-reactive/simple-reactive.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from '../shared/shared.module';
import { UserRoutingModule } from './user-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    UserRoutingModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatListModule,
    MatIconModule
  ],
  declarations: [UserListComponent, UserDetailComponent, SimpleReactiveComponent],
  exports: [UserListComponent],
  providers: [UserService]
})
export class UsersModule { }
