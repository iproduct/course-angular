import {Component, NgZone, ElementRef} from '@angular/core';
import { ToggleClassService } from '../../toggle-class.service';

@Component({
  selector: 'cmp-eleven',
  template: `
    <a>Cmp11</a>
  `
})
export class ComponentEleven {

  constructor(private el: ElementRef, private toggleClassService: ToggleClassService) {}

  ngAfterViewChecked() {
    this.toggleClassService.toggleElementClass(this.el);
  }
}
