import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'kt-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  @Output() openSidenav = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
  }

}
