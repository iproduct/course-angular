import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { DefaultChangeDetectionModule } from './default-change-detection/default-change-detection.module';
import { ManualChangeDetectionModule } from './manual-change-detection/manual-change-detection.module';
import { OnPushChangeDetectionObservablesModule } from './on-push-change-detection-observables/on-push-change-detection-observables.module';
import { OnPushChangeDetectionModule } from './on-push-change-detection/on-push-change-detection.module';
import { ToggleStateService } from './toggle-state.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule,
    DefaultChangeDetectionModule,
    ManualChangeDetectionModule,
    OnPushChangeDetectionModule,
    OnPushChangeDetectionObservablesModule
  ],
  providers: [ToggleStateService],
  bootstrap: [AppComponent]
})
export class AppModule { }
