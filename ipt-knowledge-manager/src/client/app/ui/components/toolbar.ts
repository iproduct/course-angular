import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ipt-toolbar',
  template: `
    <p-toolbar class="toolbar">
      <button md-icon-button (click)="openSidenav.emit()">
        <md-icon >menu</md-icon>
      </button>
        <ng-content></ng-content>
    </p-toolbar>
  `,
  styles: [`
    .toolbar div{
      font-size: 1.6em;
      border-radius: 0;
    }
  `]
})
export class ToolbarComponent {
  @Output() openSidenav = new EventEmitter();
}
