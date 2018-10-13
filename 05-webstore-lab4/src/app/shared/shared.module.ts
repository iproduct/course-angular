import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessagesComponent } from './messages/messages.component';
import { RouteNotFoundComponent } from './route-not-found/route-not-found.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [MessagesComponent, RouteNotFoundComponent],
  exports: [MessagesComponent, RouteNotFoundComponent],
})
export class SharedModule { }
