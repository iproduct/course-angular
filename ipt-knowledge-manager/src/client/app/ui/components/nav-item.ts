import { Component, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'ipt-nav-item',
  template: `
    <a mat-list-item [routerLink]="routerLink" (click)="activate.emit()">
      <mat-icon>{{ icon }}</mat-icon>
      <span mat-line><ng-content></ng-content></span>
      <span mat-line class="secondary">{{ hint }}</span>
    </a>
  `,
  styles: [`
    .secondary {
      color: rgba(0, 0, 0, 0.54);
    }
  `]
})
export class NavItemComponent {
  @Input() icon = '';
  @Input() hint = '';
  @Input() routerLink: string | any[] = '/';
  @Output() activate = new EventEmitter();
}
