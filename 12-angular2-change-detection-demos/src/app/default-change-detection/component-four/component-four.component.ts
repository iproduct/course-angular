import { Component, NgZone, ElementRef, AfterViewChecked } from '@angular/core';
import { ToggleClassService } from '../../toggle-class.service';

@Component({
  selector: 'cmp-four',
  template: `
    <a>Cmp4</a>
  `
})
export class ComponentFour implements AfterViewChecked{

  constructor(private el: ElementRef, private toggleClassService: ToggleClassService) {}

  ngAfterViewChecked() {
    this.toggleClassService.toggleElementClass(this.el);
  }
}

