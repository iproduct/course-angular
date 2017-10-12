import { BrowserModule }       from '@angular/platform-browser';
import { NgModule }     from '@angular/core';
import { BackendService }      from './backend.service';
import { LoggerService } from './logger.service';
import { NavigationComponent } from './navigation/navigation.component';

@NgModule({
  imports: [
    BrowserModule
  ],
  declarations: [
    NavigationComponent
  ],
  exports: [
    NavigationComponent
  ],
  providers: [
    BackendService,
    { provide: LoggerService, useClass: LoggerService }
  ]
})
export class CoreModule { }
