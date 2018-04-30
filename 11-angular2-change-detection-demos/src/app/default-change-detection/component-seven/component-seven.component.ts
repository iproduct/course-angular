import { Component, NgZone, ElementRef, AfterViewChecked } from '@angular/core';
import { ToggleClassService } from '../../toggle-class.service';

@Component({
  selector: 'cmp-seven',
  template: `
    <a>Cmp7</a>
  `
})
export class ComponentSeven implements AfterViewChecked {

  constructor(private el: ElementRef, private toggleClassService: ToggleClassService) {}

  ngAfterViewChecked() {
    this.toggleClassService.toggleElementClass(this.el);
  }
}
