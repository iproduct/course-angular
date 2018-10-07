import { Component } from '@angular/core';
import { MessageService } from '../../core/message.service';

@Component({
  selector: 'ws-messages',
  templateUrl: './messages.component.html'
})
export class MessagesComponent {
  constructor(public messageService: MessageService) {}
}
