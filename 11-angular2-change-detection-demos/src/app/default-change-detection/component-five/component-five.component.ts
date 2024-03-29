import { Component, NgZone, ElementRef, AfterViewChecked } from '@angular/core';
import { ToggleClassService } from '../../toggle-class.service';

@Component({
  selector: 'cmp-five',
  template: `
    <a>Cmp5</a>
  `
})
export class ComponentFive implements AfterViewChecked {

  constructor(private el: ElementRef, private toggleClassService: ToggleClassService) {}

  ngAfterViewChecked() {
    this.toggleClassService.toggleElementClass(this.el);
  }
}

