import {Component, NgZone, ElementRef} from '@angular/core';
import { ToggleClassService } from '../../toggle-class.service';

@Component({
  selector: 'cmp-fiveteen',
  template: `
    <a>Cmp15</a>
  `
})
export class ComponentFiveteen {

  constructor(private el: ElementRef, private toggleClassService: ToggleClassService) {}

  ngAfterViewChecked() {
    this.toggleClassService.toggleElementClass(this.el);
  }
}
