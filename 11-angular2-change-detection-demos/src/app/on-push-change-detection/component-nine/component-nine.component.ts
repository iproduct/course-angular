import {Component, NgZone, ElementRef} from '@angular/core';
import {ComponentSeventeen} from '../component-seventeen';
import { ToggleClassService } from '../../toggle-class.service';

@Component({
  selector: 'cmp-nine',
  template: `
    <a>Cmp9</a>

    <ul>
      <li><cmp-seventeen></cmp-seventeen></li>
    </ul>
  `
})
export class ComponentNine {

  constructor(private el: ElementRef, private toggleClassService: ToggleClassService) {}

  ngAfterViewChecked() {
    this.toggleClassService.toggleElementClass(this.el);
  }
}
