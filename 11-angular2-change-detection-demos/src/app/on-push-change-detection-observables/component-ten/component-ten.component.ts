import {Component, NgZone, ElementRef, ChangeDetectionStrategy} from '@angular/core';
import { ToggleClassService } from '../../toggle-class.service';

@Component({
  selector: 'cmp-ten',
  template: `
    <a class="on-push">Cmp10</a>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComponentTen {

  constructor(private el: ElementRef, private toggleClassService: ToggleClassService) {}

  ngAfterViewChecked() {
    this.toggleClassService.toggleElementClass(this.el);
  }

  triggerChangeDetection () { }
}
