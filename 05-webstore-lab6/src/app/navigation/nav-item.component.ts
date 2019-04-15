import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ws-nav-item',
  template: `
    <a mat-list-item (click)="navigate.emit(routerLink)" routerLinkActive="active">
      <mat-icon mat-list-icon>{{ icon }}</mat-icon>
      <span mat-line><ng-content></ng-content></span>
      <span mat-line class="secondary">{{ hint }}</span>
    </a>
  `,
  styles: [
    `
    .secondary {
      color: rgba(0, 0, 0, 0.54);
    }

    a.active {
      background-color: rgba(0, 0, 0, 0.2);
    }

    a:focus {
      border: 1px solid lightblue;
    }

  `
  ]
})
export class NavItemComponent {
  @Input() icon = '';
  @Input() hint = '';
  @Input() routerLink: string | any[] = '/';
  @Output() navigate = new EventEmitter<string>();
}
