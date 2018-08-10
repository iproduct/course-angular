import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouteNotFoundComponent } from './route-not-found/route-not-found.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [RouteNotFoundComponent],
  exports: [RouteNotFoundComponent],
 
})
export class SharedModule { }
