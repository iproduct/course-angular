import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DefaultChangeDetectionComponent } from './default-change-detection/default-change-detection.component';
import { ManualChangeDetectionComponent } from './manual-change-detection/manual-change-detection.component';
// tslint:disable-next-line:max-line-length
import { OnPushChangeDetectionObservablesComponent } from './on-push-change-detection-observables/on-push-change-detection-observables.component';
import { OnPushChangeDetectionComponent } from './on-push-change-detection/on-push-change-detection.component';

@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: '', redirectTo: '/default-change-detection', pathMatch: 'full' },
      { path: 'default-change-detection', component: DefaultChangeDetectionComponent },
      { path: 'on-push-change-detection', component: OnPushChangeDetectionComponent },
      { path: 'on-push-change-detection-observables', component: OnPushChangeDetectionObservablesComponent },
      { path: 'manual-change-detection', component: ManualChangeDetectionComponent },
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
