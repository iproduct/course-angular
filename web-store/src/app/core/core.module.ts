import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoggerService } from './logger.service';
import { BackendService } from './backend.service';
import { HttpClientModule } from '@angular/common/http';
import { BackendObservableService } from './backend-observable.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    LoggerService,
    { provide: BackendService, useClass: BackendObservableService }
  ],
  declarations: []
})
export class CoreModule { }
