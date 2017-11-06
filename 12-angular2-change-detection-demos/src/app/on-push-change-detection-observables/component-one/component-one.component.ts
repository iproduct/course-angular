import { Input, Component, NgZone, ElementRef, ChangeDetectionStrategy, AfterViewChecked } from '@angular/core';
import {Subject} from 'rxjs/Rx';
import {ComponentTwo} from '../component-two';
import {ComponentThree} from '../component-three';
import { ToggleClassService } from '../../toggle-class.service';

@Component({
  selector: 'cmp-one',
  template: `
    <a class="on-push">Cmp1</a>

    <ul>
      <li><cmp-two [model]="model"></cmp-two></li>
      <li><cmp-three [model]="model"></cmp-three></li>
    </ul>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComponentOne implements AfterViewChecked {

  @Input() model: Subject<any>;

  constructor(private el: ElementRef, private toggleClassService: ToggleClassService) {}

  ngAfterViewChecked() {
    this.toggleClassService.toggleElementClass(this.el);
  }
}
