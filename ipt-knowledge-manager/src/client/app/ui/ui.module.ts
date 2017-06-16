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
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UiActions } from './ui.actions';

import { LayoutComponent } from './components/layout';
import { ToolbarComponent } from './components/toolbar';
import { NavItemComponent } from './components/nav-item';
import { NotFoundComponent } from './components/not-found';
import { SidenavComponent } from './components/sidenav';
import { MdSidenavModule } from '@angular/material';
import { MdListModule } from '@angular/material';
import { MdButtonModule } from '@angular/material';
import { MdIconModule } from '@angular/material';
import { ToolbarModule } from 'primeng/primeng';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    SharedModule,
    MdSidenavModule,
    MdListModule,
    MdButtonModule,
    MdIconModule,
    ToolbarModule
  ],
  declarations: [
    LayoutComponent,
    ToolbarComponent,
    SidenavComponent,
    NavItemComponent,
    NotFoundComponent
  ],
  providers: [
    UiActions
  ],
  exports: [
    LayoutComponent,
    ToolbarComponent,
    SidenavComponent,
    NavItemComponent,
    NotFoundComponent
  ]
})
export class UiModule {}
