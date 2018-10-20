import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ipt-toolbar',
  template: `
    <mat-toolbar color="primary" class="toolbar">
      <button mat-icon-button (click)="openSidenav.emit()">
      <mat-icon>menu</mat-icon>
      </button>
        <ng-content></ng-content>
    </mat-toolbar>
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
