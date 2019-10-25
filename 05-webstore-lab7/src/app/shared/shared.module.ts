import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageComponent } from './message/message.component';
import { MessagesComponent } from './messages/messages.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSnackBarModule, MatButtonModule, MatIconModule } from '@angular/material';
import { CoreModule } from '../core/core.module';



@NgModule({
  declarations: [MessageComponent, MessagesComponent],
  exports: [MessagesComponent, MessageComponent],
  imports: [
    CommonModule,
    CoreModule,
    FlexLayoutModule,
    MatSnackBarModule,
    MatButtonModule,
    MatIconModule,
  ],
  entryComponents: [MessageComponent]
})
export class SharedModule { }
