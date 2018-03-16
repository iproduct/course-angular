import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoggerService } from './logger.service';
import { BackendService } from './backend.service';
import { HttpClientModule } from '@angular/common/http';
import { BackendObservableService } from './backend-observable.service';
import { CanDeactivateGuard } from './can-deactivate-guard.service';
import { DialogService } from './dialog.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    LoggerService,
    { provide: BackendService, useClass: BackendObservableService },
    CanDeactivateGuard,
    DialogService
  ]
})
export class CoreModule { }
