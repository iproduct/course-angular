import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageComponent } from './message/message.component';
import { MessagesComponent } from './messages/messages.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSnackBarModule, MatButtonModule, MatIconModule } from '@angular/material';



@NgModule({
  declarations: [MessageComponent, MessagesComponent],
  exports: [MessageComponent, MessagesComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatSnackBarModule,
    MatButtonModule,
    MatIconModule,
  ],
  entryComponents: [MessageComponent]
})
export class SharedModule { }
