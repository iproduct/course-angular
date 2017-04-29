import {Component, NgZone, ElementRef} from '@angular/core';
import {toggleClass} from '../../toggle-class.service';

@Component({
  selector: 'cmp-twelve',
  template: `
    <a (click)="callMe()">Cmp12</a>
    {{counter}}
  `
})
export class ComponentTwelve {
  counter = 0;

  constructor(private zone: NgZone, private el: ElementRef) {}

  ngAfterViewChecked() {
    toggleClass(this.el, this.zone);
  }

  callMe() {
    this.counter ++;
  }
}
