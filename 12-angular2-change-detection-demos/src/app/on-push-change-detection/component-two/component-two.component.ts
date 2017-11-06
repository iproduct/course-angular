import {Component, NgZone, ElementRef, ChangeDetectionStrategy, ViewChildren, ChangeDetectorRef} from '@angular/core';
import {ComponentFour} from '../component-four';
import {ComponentFive} from '../component-five';
import { ToggleClassService } from '../../toggle-class.service';

@Component({
  selector: 'cmp-two',
  template: `
    <a class="on-push">Cmp2</a>

    <ul>
      <li><cmp-four></cmp-four></li>
      <li><cmp-five></cmp-five></li>
    </ul>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComponentTwo {

  counter = 0;

  constructor(private zone: NgZone, private el: ElementRef, private cd: ChangeDetectorRef,
    private toggleClassService: ToggleClassService) {}

  ngAfterViewChecked() {
    this.toggleClassService.toggleElementClass(this.el);
  }
}

