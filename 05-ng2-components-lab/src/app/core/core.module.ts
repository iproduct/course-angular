import { BrowserModule }       from '@angular/platform-browser';
import { NgModule }     from '@angular/core';
import { BackendService }      from './backend.service';
import { LoggerService } from './logger.service';

@NgModule({
  imports: [
    BrowserModule
  ],
  providers: [
    BackendService,
    { provide: LoggerService, useClass: LoggerService }
  ]
})
export class CoreModule { }
