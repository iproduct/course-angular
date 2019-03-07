import { Component, OnInit, Input } from '@angular/core';
import { MessageService } from '../../core/message.service';
import { MatSnackBar, MatSnackBarRef } from '@angular/material';
import { filter } from 'rxjs/operators';
import { MessageComponent } from '../message/message.component';
import { MessageType, MessageData } from '../shared-types';

@Component({
  selector: 'ws-messages',
  templateUrl: './messages.component.html'
})
export class MessagesComponent implements OnInit {
  private _level: MessageType;
  @Input() set level( level: string) {
    this._level = MessageType[level] || MessageType.SUCCESS;
  }
  _activeSnackBar: MatSnackBarRef<MessageComponent> = undefined;

  constructor(private messageService: MessageService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.messageService.messages.subscribe(
      mesageData => {
        if (!mesageData) {
          if (this._activeSnackBar) {
            this._activeSnackBar.dismiss();
            this._activeSnackBar = undefined;
          }
        } else {
          if (mesageData.type <= this._level) {
            this._activeSnackBar = this.openSnackBar(mesageData);
          }
        }
      }
    );
  }

  private openSnackBar(messageData: MessageData): MatSnackBarRef<MessageComponent> {
    const cssClass = `snack-${MessageType[messageData.type].toString().toLowerCase()}`;
    return this.snackBar.openFromComponent(MessageComponent, {
      duration: 50000,
      panelClass: cssClass,
      data: { ...messageData, hasAction: true}
    });
  }
}
