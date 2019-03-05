import { Component, OnInit, Input, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { MessageData } from '../shared-types';

@Component({
  selector: 'ws-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  constructor( @Inject(MAT_SNACK_BAR_DATA) public data: MessageData ) { }

  ngOnInit() {
  }

}
