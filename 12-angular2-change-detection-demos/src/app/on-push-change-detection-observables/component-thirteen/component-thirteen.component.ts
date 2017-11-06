import {Component, NgZone, ElementRef, ChangeDetectionStrategy} from '@angular/core';
import { ToggleClassService } from '../../toggle-class.service';

@Component({
  selector: 'cmp-thirteen',
  template: `
    <a class="on-push">Cmp13</a>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComponentThirteen {

  constructor(private el: ElementRef, private toggleClassService: ToggleClassService) {}

  ngAfterViewChecked() {
    this.toggleClassService.toggleElementClass(this.el);
  }
}
