import { Component, OnInit, Input, Inject, ViewEncapsulation } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';
import { MessageData, MessageType } from '../../core/message.service';

@Component({
  selector: 'ws-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MessageComponent implements OnInit {

  constructor( @Inject(MAT_SNACK_BAR_DATA) public data: MessageData, private ref: MatSnackBarRef<MessageComponent> ) { }

  ngOnInit() {
  }

  getCssClasses() {
    return {
      error: this.data.type === MessageType.ERROR,
      warning: this.data.type === MessageType.WARNING,
      success: this.data.type === MessageType.SUCCESS,
      info: this.data.type === MessageType.INFO,
    };
  }

  getTypeAsString(type: MessageType): string {
    return MessageType[type];
  }

  close() {
    this.ref.dismiss();
  }

}
