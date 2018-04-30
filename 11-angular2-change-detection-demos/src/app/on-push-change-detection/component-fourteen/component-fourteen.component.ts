import {Component, NgZone, ElementRef} from '@angular/core';
import { ToggleClassService } from '../../toggle-class.service';

@Component({
  selector: 'cmp-fourteen',
  template: `
    <a>Cmp14</a>
  `
})
export class ComponentFourteen {

  constructor(private el: ElementRef, private toggleClassService: ToggleClassService) {}

  ngAfterViewChecked() {
    this.toggleClassService.toggleElementClass(this.el);
  }
}
