import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Views } from './views';

@Component({
  selector: 'kt-nav-item',
  templateUrl: './nav-item.component.html',
  styleUrls: ['./nav-item.component.css']
})
export class NavItemComponent implements OnInit {
  @Input() icon = '';
  @Input() hint = '';
  @Input() routerLink: string | any[] = '/';
  @Input() viewId = Views.HOME;
  @Output() activate = new EventEmitter<Views>();

  constructor() { }

  ngOnInit() {
  }

}
