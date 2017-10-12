/*
 * Copyright (c) 2015-2017 IPT-Intellectual Products & Technologies (IPT).
 * All rights reserved.
 *
 * This file is licensed under terms of GNU GENERAL PUBLIC LICENSE Version 3
 * (GPL v3). The full text of GPL v3 license is providded in file named LICENSE,
 * residing in the root folder of this project.
 *
 */

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BackendService } from './backend.service';
import { LoggerService } from './logger.service';
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
    LoggerService,
    DialogService,
    CanDeactivateGuard,
    { provide: API_BASE_URL, useFactory: getBaseApiUrl },
    { provide: BackendService, useClass: BackendHttpService }
  ]
})
export class CoreModule { }
