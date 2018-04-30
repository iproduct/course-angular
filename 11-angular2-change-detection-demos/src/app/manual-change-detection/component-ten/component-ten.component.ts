import { Component, NgZone, ElementRef, AfterViewChecked } from '@angular/core';
import { ToggleClassService } from '../../toggle-class.service';

@Component({
  selector: 'cmp-ten',
  template: `
    <a (click)="callMe()">Cmp10</a>
    {{counter}}
  `
})
export class ComponentTen implements AfterViewChecked {
  counter = 0;

  constructor(private el: ElementRef, private toggleClassService: ToggleClassService) {}

  ngAfterViewChecked() {
    this.toggleClassService.toggleElementClass(this.el);
  }

  callMe() {
    this.counter ++;
  }
}
