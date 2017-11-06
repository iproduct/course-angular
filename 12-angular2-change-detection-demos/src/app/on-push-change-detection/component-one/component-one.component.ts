import {Component, NgZone, ElementRef} from '@angular/core';
import {ComponentTwo} from '../component-two';
import {ComponentThree} from '../component-three';
import { ToggleClassService } from '../../toggle-class.service';

@Component({
  selector: 'cmp-one',
  template: `
    <a>Cmp1</a>

    <ul>
      <li><cmp-two></cmp-two></li>
      <li><cmp-three></cmp-three></li>
    </ul>
  `
})
export class ComponentOne {

  constructor(private el: ElementRef, private toggleClassService: ToggleClassService) {}

  ngAfterViewChecked() {
    this.toggleClassService.toggleElementClass(this.el);
  }
}
