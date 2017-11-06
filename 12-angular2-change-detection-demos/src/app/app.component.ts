import { Component, ViewEncapsulation, ViewChild, AfterViewChecked, Renderer2 } from '@angular/core';
import { Subject } from 'rxjs/Rx';

import { DefaultChangeDetectionComponent } from './default-change-detection';
import { OnPushChangeDetectionComponent } from './on-push-change-detection';
import { OnPushChangeDetectionObservablesComponent } from './on-push-change-detection-observables';
import { ManualChangeDetectionComponent } from './manual-change-detection';
import { ToggleClassService } from './toggle-class.service';

@Component({
  selector: 'cd-demos-app',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements AfterViewChecked {
  @ViewChild(DefaultChangeDetectionComponent) defaultChangeDetectionCmp: DefaultChangeDetectionComponent;
  @ViewChild(OnPushChangeDetectionComponent) onPushChangeDetectionCmp: OnPushChangeDetectionComponent;
  @ViewChild(OnPushChangeDetectionObservablesComponent) onPushChangeDetectionObservablesCmp: OnPushChangeDetectionObservablesComponent;
  @ViewChild(ManualChangeDetectionComponent) manualChangeDetectionCmp: ManualChangeDetectionComponent;
  notifier: Subject<any> = new Subject();

  constructor(private toggleClassService: ToggleClassService, renderer: Renderer2) {
    this.toggleClassService.renderer = renderer;
  }

  ngAfterViewChecked() {
    if (this.defaultChangeDetectionCmp) {
      this.defaultChangeDetectionCmp.notifier = this.notifier;
    }

    if (this.onPushChangeDetectionCmp) {
      this.onPushChangeDetectionCmp.notifier = this.notifier;
    }

    if (this.onPushChangeDetectionObservablesCmp) {
      this.onPushChangeDetectionObservablesCmp.notifier = this.notifier;
    }

    if (this.manualChangeDetectionCmp) {
      this.manualChangeDetectionCmp.notifier = this.notifier;
    }
  }
}
