import {Component, NgZone, ElementRef, ChangeDetectionStrategy} from '@angular/core';
import { ToggleClassService } from '../../toggle-class.service';

@Component({
  selector: 'cmp-sixteen',
  template: `
    <a class="on-push">Cmp16</a>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComponentSixteen {

  constructor(private el: ElementRef, private toggleClassService: ToggleClassService) {}

  ngAfterViewChecked() {
    this.toggleClassService.toggleElementClass(this.el);
  }

  triggerChangeDetection() {}
}
