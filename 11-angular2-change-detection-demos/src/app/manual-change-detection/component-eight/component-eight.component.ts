import { Component, NgZone, ElementRef, ChangeDetectionStrategy, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import {ComponentSixteen} from '../component-sixteen';
import { ToggleClassService } from '../../toggle-class.service';

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
export class ComponentEight implements AfterViewChecked {
  numberOfTicks = 0;

  constructor(private ref: ChangeDetectorRef, private el: ElementRef, private toggleClassService: ToggleClassService) {
     setInterval(() => {
      this.numberOfTicks ++
      // this.ref.markForCheck();
      this.ref.detectChanges();
    }, 2000);
  }

  ngAfterViewChecked() {
    this.toggleClassService.toggleElementClass(this.el);
  }
}
