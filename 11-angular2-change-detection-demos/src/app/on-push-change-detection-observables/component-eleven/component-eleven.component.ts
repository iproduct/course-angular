import {Component, NgZone, ElementRef, ChangeDetectionStrategy} from '@angular/core';
import { ToggleClassService } from '../../toggle-class.service';

@Component({
  selector: 'cmp-eleven',
  template: `
    <a class="on-push">Cmp11</a>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComponentEleven {

  constructor(private el: ElementRef, private toggleClassService: ToggleClassService) {}

  ngAfterViewChecked() {
    this.toggleClassService.toggleElementClass(this.el);
  }
}
