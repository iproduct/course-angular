import { Component, NgZone, ElementRef} from '@angular/core';
import {ComponentFour} from '../component-four';
import {ComponentFive} from '../component-five';
import { ToggleClassService } from '../../toggle-class.service';

@Component({
  selector: 'cmp-two',
  template: `
    <a>Cmp2</a>

    <ul>
      <li><cmp-four></cmp-four></li>
      <li><cmp-five></cmp-five></li>
    </ul>
  `
})
export class ComponentTwo {

  constructor(private el: ElementRef, private toggleClassService: ToggleClassService) {}

  ngAfterViewChecked() {
    this.toggleClassService.toggleElementClass(this.el);
  }
}

