import {HttpClientModule} from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoggerService } from './logger.service';
import { BackendMockService } from './backend-mock.service';
import { BackendPromiseService } from './backend-promise.service';
import { API_BASE_URL, getBaseApiUrl } from '../shared/constants';
import { BackendPromiseHttpService } from './backend-promise-http.service';
/*
 * Copyright (c) 2015-2017 IPT-Intellectual Products & Technologies (IPT).
 * All rights reserved.
 *
 * This file is licensed under terms of GNU GENERAL PUBLIC LICENSE Version 3
 * (GPL v3). The full text of GPL v3 license is providded in file named LICENSE,
 * residing in the root folder of this project.
 *
 */

import { BackendHttpService } from './backend-http.service';
import { BackendService } from './backend.service';
import { CanDeactivateGuard } from './can-deactivate-guard.service';
import { DialogService } from './dialog.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [],
  providers: [
    LoggerService,
    {provide: API_BASE_URL, useFactory: getBaseApiUrl},
    {provide: BackendPromiseService, useClass: BackendPromiseHttpService},
    {provide: BackendService, useClass: BackendHttpService},
    CanDeactivateGuard,
    DialogService
  ]
})
export class CoreModule { }
