import {Component, NgZone, ElementRef, ChangeDetectionStrategy} from '@angular/core';
import { ToggleClassService } from '../../toggle-class.service';

@Component({
  selector: 'cmp-twelve',
  template: `
    <a class="on-push">Cmp12</a>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComponentTwelve {

  constructor(private el: ElementRef, private toggleClassService: ToggleClassService) {}

  ngAfterViewChecked() {
    this.toggleClassService.toggleElementClass(this.el);
  }

  triggerChangeDetection() {
  }
}
