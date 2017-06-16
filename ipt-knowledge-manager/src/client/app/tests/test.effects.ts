/*
 * Copyright (c) 2015-2017 IPT-Intellectual Products & Technologies (IPT).
 * All rights reserved.
 *
 * This file is licensed under terms of GNU GENERAL PUBLIC LICENSE Version 3
 * (GPL v3). The full text of GPL v3 license is providded in file named LICENSE,
 * residing in the root folder of this project.
 *
 */

/* tslint:disable: member-ordering */
import { Injectable } from '@angular/core';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { TestActions } from './test.actions';
import { RootState } from './test.module'; // Root state type
import { State } from './test.reducer'; // Test specific state type
import { TestService } from './test.service';
import { ApplicationError } from '../shared/shared-types';
import { Test } from './test.model';
import { getTests, getTestsState } from './test.selectors';


@Injectable()

export class TestEffects {
  constructor(
    private actions$: Actions,
    private store: Store<RootState>,
    private testActions: TestActions,
    private testService: TestService
  ) { }

  @Effect() load$ = this.actions$
    .ofType(TestActions.LOAD_TESTS)
    .switchMap(() => this.testService.findAllTests()
      .mergeMap(tests => Observable.of(
        this.testActions.loadTestsSuccess(tests)
      ))
      .catch((err) => Observable.of(
        this.testActions.loadTestsFailure(new ApplicationError<Test>(err, null, Test))
      ))
    );

  @Effect() loadTest$ = this.actions$
    .ofType(TestActions.LOAD_TEST)
    .map(action => action.payload)
    .withLatestFrom(this.store.select<State>(getTestsState))
    .switchMap( ([testId, tests]) => {
      const test = tests.entities[testId];
      if (test) {
        return (Observable.of(this.testActions.loadTestSuccess(test)));
      } else {
        return this.testService.findTest(testId)
          .mergeMap(foundTest => Observable.of(
            this.testActions.loadTestSuccess(foundTest)
          ))
          .catch(err => Observable.of(
            this.testActions.loadTestFailure(new ApplicationError<Test>(err, testId, Test))
          ))
      }
    });

  @Effect() add$ = this.actions$
    .ofType(TestActions.ADD_TEST)
    .map(action => action.payload)
    .switchMap(test =>
      this.testService.addTest(test)
        .mergeMap(createdTest => Observable.of(
          this.testActions.addTestSuccess(createdTest)
        ))
        .catch(err => Observable.of(
          this.testActions.deleteTestFailure(new ApplicationError<Test>(err, null, Test, test))
        ))
    );

  @Effect() edit$ = this.actions$
    .ofType(TestActions.EDIT_TEST)
    .map(action => action.payload)
    .switchMap(test =>
      this.testService.editTest(test)
        .mergeMap(editedTest => Observable.of(
          this.testActions.editTestSuccess(editedTest)
        ))
        .catch(err => Observable.of(
          this.testActions.deleteTestFailure(new ApplicationError<Test>(err, test.id, Test, test))
        ))
    );

  @Effect() delete$ = this.actions$
    .ofType(TestActions.DELETE_TEST)
    .map(action => action.payload)
    .switchMap(testId =>
      this.testService.deleteTest(testId)
        .mergeMap(test => Observable.of(
          this.testActions.deleteTestSuccess(test)
        ))
        .catch(err => Observable.of(
          this.testActions.deleteTestFailure(new ApplicationError<Test>(err, testId, Test))
        ))
    );

}
