import {Component, NgZone, ElementRef} from '@angular/core';
import { ToggleClassService } from '../../toggle-class.service';

@Component({
  selector: 'cmp-twelve',
  template: `
    <a (click)="callMe()">Cmp12</a>
    {{counter}}
  `
})
export class ComponentTwelve {
  counter = 0;

  constructor(private el: ElementRef, private toggleClassService: ToggleClassService) {}

  ngAfterViewChecked() {
    this.toggleClassService.toggleElementClass(this.el);
  }

  callMe() {
    this.counter ++;
  }
}
