import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoggerService } from './logger.service';
import { BackendMockService } from './backend-mock.service';
import { BackendPromiseService } from './backend-promise.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    LoggerService,
    {provide: BackendPromiseService, useClass: BackendMockService}

  ]
})
export class CoreModule { }
