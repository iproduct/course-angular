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

@NgModule({
  imports: [
    CommonModule,
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
    LayoutComponent
  ],
  exports: [
    NavItemComponent,
    SidenavComponent,
    ToolbarComponent,
    LayoutComponent
  ]
})
export class UiModule {}
