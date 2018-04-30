import { BrowserModule }       from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BackendService }      from './backend.service';
import { Logger }              from './logger.service';
import { BackendHttpService } from './backend-http.service';
import { HttpModule }    from '@angular/http';

// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataModel }  from './in-memory-data.model';
import { BackendObservableService } from './backend-observable.service';
import { BackendHttpObservableService } from './backend-http-observable.service';
import { API_BASE_URL } from './common.interfaces';
import { DialogService } from './dialog.service';
import { CanDeactivateGuard } from './can-deactivate-guard.service';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    // InMemoryWebApiModule.forRoot(InMemoryDataModel, {delay: 200}),
  ],
  providers: [
    Logger,
    DialogService,
    CanDeactivateGuard,
    { provide: API_BASE_URL, useValue: '/api' },
    { provide: BackendService, useClass: BackendHttpService },
    { provide: BackendObservableService, useClass: BackendHttpObservableService }
  ]
})
export class CommonModule { }
