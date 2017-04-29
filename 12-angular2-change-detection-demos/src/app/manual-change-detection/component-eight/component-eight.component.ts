import { Component, NgZone, ElementRef, ChangeDetectionStrategy, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import {ComponentSixteen} from '../component-sixteen';
import {toggleClass} from '../../toggle-class.service';

@Component({
  selector: 'cmp-eight',
  template: `
    <a>Cmp8</a>
    {{numberOfTicks}}
    <ul>
      <li><cmp-sixteen></cmp-sixteen></li>
    </ul>
  `
})
export class ComponentEight implements AfterViewChecked{
  numberOfTicks = 0;

  constructor(private ref: ChangeDetectorRef, private zone: NgZone, private el: ElementRef) {
     setInterval(() => {
      this.numberOfTicks ++
      // this.ref.markForCheck();
      // this.ref.detectChanges();
    }, 2000);
  }

  ngAfterViewChecked() {
    toggleClass(this.el, this.zone);
  }
}
