import { Component, NgZone, ElementRef, AfterViewChecked } from '@angular/core';
import { ToggleClassService } from '../../toggle-class.service';

@Component({
  selector: 'cmp-six',
  template: `
    <a>Cmp6</a>
  `
})
export class ComponentSix implements AfterViewChecked{

  constructor(private el: ElementRef, private toggleClassService: ToggleClassService) {}

  ngAfterViewChecked() {
    this.toggleClassService.toggleElementClass(this.el);
  }
}


