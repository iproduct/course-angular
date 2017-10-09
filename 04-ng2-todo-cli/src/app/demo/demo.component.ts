import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
// import { Message } from '../app.component';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css']
})
export class DemoComponent implements OnInit {
  @Input() public message = 'Default TODO.';
  @Output() values = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {

  }

  onKey($event: KeyboardEvent) {
    this.values.emit((event.target as HTMLInputElement).value);
  }
}
