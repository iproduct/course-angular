import { Component, NgZone, ElementRef, AfterViewChecked } from '@angular/core';
import {toggleClass} from '../../toggle-class.service';

@Component({
  selector: 'cmp-ten',
  template: `
    <a (click)="callMe()">Cmp10</a>
    {{counter}}
  `
})
export class ComponentTen implements AfterViewChecked{
  counter = 0;

  constructor(private zone: NgZone, private el: ElementRef) {}

  ngAfterViewChecked() {
    toggleClass(this.el, this.zone);
  }

  callMe() {
    this.counter ++;
  }
}
