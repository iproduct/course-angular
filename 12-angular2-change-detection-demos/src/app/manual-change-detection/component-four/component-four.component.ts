import {Component, NgZone, ElementRef} from '@angular/core';
import {ComponentEight} from '../component-eight';
import {ComponentNine} from '../component-nine';
import { ToggleClassService } from '../../toggle-class.service';

@Component({
  selector: 'cmp-four',
  template: `
    <a>Cmp4</a>

    <ul>
      <li><cmp-eight></cmp-eight></li>
      <li><cmp-nine></cmp-nine></li>
    </ul>
  `
})
export class ComponentFour {

  constructor(private el: ElementRef, private toggleClassService: ToggleClassService) {}

  ngAfterViewChecked() {
    this.toggleClassService.toggleElementClass(this.el);
  }

  triggerChangeDetection () { }
}

