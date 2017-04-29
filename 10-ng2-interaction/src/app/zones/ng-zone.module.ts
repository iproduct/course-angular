import { NgModule }     from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgZoneDemo } from './ng-zone-demo';

@NgModule({
  imports: [
    BrowserModule
  ],
  declarations: [NgZoneDemo],
  exports: [NgZoneDemo]
})
export class NgZoneModule { }
