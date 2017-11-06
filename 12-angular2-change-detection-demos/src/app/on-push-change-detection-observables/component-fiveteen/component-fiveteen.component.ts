import {Component, NgZone, ElementRef, ChangeDetectionStrategy} from '@angular/core';
import { ToggleClassService } from '../../toggle-class.service';

@Component({
  selector: 'cmp-fiveteen',
  template: `
    <a class="on-push">Cmp15</a>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComponentFiveteen {

  constructor(private el: ElementRef, private toggleClassService: ToggleClassService) {}

  ngAfterViewChecked() {
    this.toggleClassService.toggleElementClass(this.el);
  }
}
