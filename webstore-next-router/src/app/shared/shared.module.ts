import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouteNotFoundComponent } from './route-not-found/route-not-found.component';
import { MatSnackBarModule, MatButtonModule, MatIconModule } from '@angular/material';
import { MessagesComponent } from './messages/messages.component';
import { MessageComponent } from './message/message.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { EmptyComponent } from './empty.component';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatSnackBarModule,
    MatButtonModule,
    MatIconModule,
  ],
  declarations: [RouteNotFoundComponent, MessageComponent, MessagesComponent, EmptyComponent],
  exports: [RouteNotFoundComponent, MessagesComponent, EmptyComponent],
  entryComponents: [MessageComponent]
})
export class SharedModule { }
