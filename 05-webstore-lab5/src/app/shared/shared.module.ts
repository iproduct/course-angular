import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageComponent } from './message/message.component';
import { RouteNotFoundComponent } from './route-not-found/route-not-found.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [MessageComponent, RouteNotFoundComponent],
  exports: [MessageComponent, RouteNotFoundComponent],
  entryComponents: [MessageComponent]
})
export class SharedModule { }
