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
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { Test } from './test.model';
import { TestService } from './test.service';
import { Store } from '@ngrx/store';
import * as fromTests from './test.module';
import { Observable } from 'rxjs/Rx';
import { TestActions } from './test.actions';
import { ApplicationError } from '../shared/shared-types';
import { getTestsState } from './test.selectors';
import { RootState } from './test.module';

@Injectable()
export class TestResolver implements Resolve<Test> {
  constructor(
    private store: Store<RootState>,
    private testService: TestService,
    private testActions: TestActions) { }

  public resolve(route: ActivatedRouteSnapshot): Observable<Test> {
    const testId = route.params['id'];
    return this.store.select(getTestsState).take(1)
      .flatMap(tests => {
        const test = tests && tests.entities && tests.entities[testId];
        if (test) {
          return (Observable.of(test));
        } else {
          return this.testService.findTest(testId)
            .switchMap(foundTest => {
              this.store.dispatch(this.testActions.loadTestSuccess(foundTest));
              return Observable.of(foundTest);
            })
            .catch(err => {
              this.store.dispatch(
                this.testActions.loadTestFailure(new ApplicationError<Test>(err, testId, Test)));
              throw err;
            })
        }
      });
  }
}
