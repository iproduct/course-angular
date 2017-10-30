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
