import { Component, NgZone, ElementRef, HostListener, AfterViewChecked } from '@angular/core';
import {ToggleClassService } from '../../toggle-class.service';

@Component({
  selector: 'cmp-sixteen',
  // host: {
  //   '(click)': 'triggerChangeDetection()'
  // },
  template: `
    <a class="click-me">Cmp16</a>
  `
})
export class ComponentSixteen implements AfterViewChecked {
  @HostListener('click', ['$event']) triggerChangeDetection(event: Event) {}

  constructor(private el: ElementRef, private toggleClassService: ToggleClassService) {}

  ngAfterViewChecked() {
    this.toggleClassService.toggleElementClass(this.el);
  }

}
