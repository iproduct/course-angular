import {Component, NgZone, ElementRef, ChangeDetectionStrategy} from '@angular/core';
import {ComponentSixteen} from '../component-sixteen';
import { ToggleClassService } from '../../toggle-class.service';

@Component({
  selector: 'cmp-eight',
  template: `
    <a class="on-push">Cmp8</a>

    <ul>
      <li><cmp-sixteen></cmp-sixteen></li>
    </ul>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComponentEight {

  constructor(private el: ElementRef, private toggleClassService: ToggleClassService) {}

  ngAfterViewChecked() {
    this.toggleClassService.toggleElementClass(this.el);
  }
}
