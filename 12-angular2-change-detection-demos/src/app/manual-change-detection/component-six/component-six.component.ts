import {Component, NgZone, ElementRef} from '@angular/core';
import {ComponentTwelve} from '../component-twelve';
import {ComponentThirteen} from '../component-thirteen';
import { ToggleClassService } from '../../toggle-class.service';

@Component({
  selector: 'cmp-six',
  template: `
    <a>Cmp6</a>

    <ul>
      <li><cmp-twelve></cmp-twelve></li>
      <li><cmp-thirteen></cmp-thirteen></li>
    </ul>
  `
})
export class ComponentSix {

  constructor(private el: ElementRef, private toggleClassService: ToggleClassService) {}

  ngAfterViewChecked() {
    this.toggleClassService.toggleElementClass(this.el);
  }
}


