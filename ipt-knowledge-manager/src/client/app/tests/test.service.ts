/*
 * Copyright (c) 2015-2017 IPT-Intellectual Products & Technologies (IPT).
 * All rights reserved.
 *
 * This file is licensed under terms of GNU GENERAL PUBLIC LICENSE Version 3
 * (GPL v3). The full text of GPL v3 license is providded in file named LICENSE,
 * residing in the root folder of this project.
 *
 */

import { Injectable } from '@angular/core';
import { Test } from './test.model';
import { BackendService } from '../core/backend.service';
import { LoggerService } from '../core/logger.service';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { IdentityType } from '../shared/shared-types';

@Injectable()
export class TestService {

  constructor(
    private backend: BackendService,
    private logger: LoggerService) { }

  public findAllTests(): Observable<Test[]> {
    return this.backend.findAll(Test);
  }

  public findTest(id: IdentityType): Observable<Test> {
    return this.backend.find(Test, id);
  }

 public addTest(test: Test): Observable<Test> {
    return this.backend.add(Test, test);
  }

  public editTest(test: Test): Observable<Test> {
    return this.backend.edit(Test, test);
  }

  public deleteTest(testId: string): Observable<Test> {
    return this.backend.delete(Test, testId);
  }

}
