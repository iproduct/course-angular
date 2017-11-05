import {
  MatToolbarModule,
  MatButtonModule,
  MatListModule,
  MatIconModule,
  MatSidenavModule
} from '@angular/material';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavItemComponent } from './nav-item/nav-item.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { LayoutComponent } from './layout/layout.component';
import { RouterModule } from '@angular/router';
import { RouteNotFoundComponent } from './route-not-found/route-not-found.component';

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
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatButtonModule
  ],
  declarations: [
    NavItemComponent,
    SidenavComponent,
    ToolbarComponent,
    LayoutComponent,
    RouteNotFoundComponent
  ],
  exports: [
    NavItemComponent,
    SidenavComponent,
    ToolbarComponent,
    LayoutComponent
  ]
})
export class UiModule {}
