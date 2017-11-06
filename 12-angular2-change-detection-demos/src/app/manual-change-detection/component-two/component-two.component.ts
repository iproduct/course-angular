import {Component, Input, ChangeDetectorRef, NgZone, ElementRef, ChangeDetectionStrategy, ViewChildren} from '@angular/core';
import {Subject} from 'rxjs/Rx';
import {ComponentFour} from '../component-four';
import {ComponentFive} from '../component-five';
import { ToggleClassService } from '../../toggle-class.service';

@Component({
  selector: 'cmp-two',
  template: `
    <a class="detached">Cmp2</a>

    <ul>
      <li><cmp-four></cmp-four></li>
      <li><cmp-five></cmp-five></li>
    </ul>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComponentTwo {

  @Input() notifier: Subject<any>;
  attached = false;

  constructor(private el: ElementRef, private cd: ChangeDetectorRef, private toggleClassService: ToggleClassService) {
  }

  ngOnInit() {
    this.cd.detach();

    this.notifier.subscribe((attach) => {
      if (attach) {
        this.el.nativeElement.querySelector('a').classList.remove('detached');
        this.cd.reattach();
      } else {
        this.el.nativeElement.querySelector('a').classList.add('detached');
        this.cd.detach();
      }
    })
  }

  ngAfterViewChecked() {
    this.toggleClassService.toggleElementClass(this.el);
  }
}
