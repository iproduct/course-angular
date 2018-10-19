import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AppComponent } from '../core/containers/app.component';
import { NotFoundPageComponent } from '../core/containers/not-found-page.component';
import { LayoutComponent } from '../core/components/layout.component';
import { NavItemComponent } from '../core/components/nav-item.component';
import { SidenavComponent } from '../core/components/sidenav.component';
import { ToolbarComponent } from '../core/components/toolbar.component';
import { MaterialModule } from '../material';

export const COMPONENTS = [
  AppComponent,
  NotFoundPageComponent,
  LayoutComponent,
  NavItemComponent,
  SidenavComponent,
  ToolbarComponent,
];

@NgModule({
  imports: [CommonModule, RouterModule, MaterialModule],
  declarations: COMPONENTS,
  exports: COMPONENTS,
})
export class CoreModule {}
