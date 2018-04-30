import {Component, NgZone, ElementRef, ChangeDetectionStrategy} from '@angular/core';
import { ToggleClassService } from '../../toggle-class.service';

@Component({
  selector: 'cmp-fourteen',
  template: `
    <a class="on-push">Cmp14</a>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComponentFourteen {

  constructor(private el: ElementRef, private toggleClassService: ToggleClassService) {}

  ngAfterViewChecked() {
    this.toggleClassService.toggleElementClass(this.el);
  }
}
