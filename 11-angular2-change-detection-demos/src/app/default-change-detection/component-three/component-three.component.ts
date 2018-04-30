import {Component, NgZone, ElementRef} from '@angular/core';
import {ComponentSix} from '../component-six';
import {ComponentSeven} from '../component-seven';
import { ToggleClassService } from '../../toggle-class.service';

@Component({
  selector: 'cmp-three',
  template: `
    <a>Cmp3</a>

    <ul>
      <li><cmp-six></cmp-six></li>
      <li><cmp-seven></cmp-seven></li>
    </ul>
  `
})
export class ComponentThree {

  constructor(private el: ElementRef, private toggleClassService: ToggleClassService) {}

  ngAfterViewChecked() {
    this.toggleClassService.toggleElementClass(this.el);
  }
}
