import {Input, Component, NgZone, ElementRef, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import {Subject} from 'rxjs/Rx';
import { ToggleClassService } from '../../toggle-class.service';

@Component({
  selector: 'cmp-seventeen',
  template: `
    <a class="on-push subscriber">Cmp17</a>
    {{counter}}
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComponentSeventeen {

  @Input() model: Subject<any>;
  counter = 0;

  constructor(private el: ElementRef, private cd: ChangeDetectorRef, private toggleClassService: ToggleClassService) {}

  ngOnInit() {
    this.model.subscribe(() => {
      this.cd.markForCheck();
      this.toggleClassService.toggleElementClass(this.el, 'checked-observable');
      this.counter ++;
    })
  }

  ngAfterViewChecked() {
    this.toggleClassService.toggleElementClass(this.el);
  }
}

