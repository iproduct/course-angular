import { BrowserModule }       from '@angular/platform-browser';
import { NgModule }     from '@angular/core';
import { BackendService }      from './backend.service';
import { Logger }              from './logger.service';

@NgModule({
  imports: [
    BrowserModule
  ],
  providers: [
    BackendService,
    Logger
  ]
})
export class CommonModule { }
