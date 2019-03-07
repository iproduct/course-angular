import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageComponent } from './message/message.component';
import { RouteNotFoundComponent } from './route-not-found/route-not-found.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSnackBarModule, MatButtonModule, MatIconModule } from '@angular/material';
import { MessagesComponent } from './messages/messages.component';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatSnackBarModule,
    MatButtonModule,
    MatIconModule,
  ],
  declarations: [MessageComponent, MessagesComponent, RouteNotFoundComponent],
  exports: [MessagesComponent, RouteNotFoundComponent],
  entryComponents: [MessageComponent]
})
export class SharedModule { }
