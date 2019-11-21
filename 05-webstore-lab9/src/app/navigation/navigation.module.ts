import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule, MatIconModule, MatListModule } from '@angular/material';
import { NavItemComponent } from './nav-item.component';
import { ToolbarComponent } from './toolbar.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [ToolbarComponent, NavItemComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatToolbarModule,
  ],
  exports: [ToolbarComponent, NavItemComponent]
})
export class NavigationModule { }
