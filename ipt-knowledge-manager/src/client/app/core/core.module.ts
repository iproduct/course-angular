import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BackendService } from './backend.service';
import { Logger } from './logger.service';
import { BackendHttpService } from './backend-http.service';
import { HttpModule } from '@angular/http';

import { API_BASE_URL } from '../shared/shared-types';
import { getBaseApiUrl } from '../constants';
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
    { provide: API_BASE_URL, useFactory: getBaseApiUrl },
    { provide: BackendService, useClass: BackendHttpService }
  ]
})
export class CoreModule { }
